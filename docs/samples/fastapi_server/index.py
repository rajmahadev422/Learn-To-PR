from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uvicorn

# Create FastAPI instance
app FastAPI(
    title="My FastAPI Server",
    description="A simple FastAPI server example",
    version="1.0.0"
)

# Pydantic models for request/response
class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None
    is_offer: Optional[bool] = False

class ItemResponse(Item):
    id: int
    created_at: datetime
    updated_at: datetime

class User(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

# In-memory database (for demonstration)
items_db = {}
users_db = {}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to FastAPI Server",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

# CRUD endpoints for items
@app.post("/items/", response_model=ItemResponse, status_code=201)
async def create_item(item: Item):
    item_id = len(items_db) + 1
    current_time = datetime.now()
    
    item_dict = item.dict()
    item_dict.update({
        "id": item_id,
        "created_at": current_time,
        "updated_at": current_time
    })
    
    items_db[item_id] = item_dict
    return items_db[item_id]

@app.get("/items/", response_model=List[ItemResponse])
async def get_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    items = list(items_db.values())
    return items[skip:skip + limit]

@app.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return items_db[item_id]

@app.put("/items/{item_id}", response_model=ItemResponse)
async def update_item(item_id: int, item: Item):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    
    current_time = datetime.now()
    updated_item = item.dict()
    updated_item.update({
        "id": item_id,
        "created_at": items_db[item_id]["created_at"],
        "updated_at": current_time
    })
    
    items_db[item_id] = updated_item
    return items_db[item_id]

@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    
    del items_db[item_id]
    return {"message": f"Item {item_id} deleted successfully"}

# User endpoints
@app.post("/users/", response_model=User)
async def create_user(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    users_db[user.username] = user.dict()
    return users_db[user.username]

@app.get("/users/{username}")
async def get_user(username: str):
    if username not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[username]

# Query parameters example
@app.get("/search/")
async def search_items(
    q: Optional[str] = None,
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0)
):
    """Search items with filters"""
    results = []
    
    for item in items_db.values():
        if q and q.lower() not in item["name"].lower():
            continue
        
        if min_price and item["price"] < min_price:
            continue
            
        if max_price and item["price"] > max_price:
            continue
            
        results.append(item)
    
    return results

# Custom exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
            "path": request.url.path
        }
    )

# Run the server
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True  # Auto-reload on code changes
    )
