# FastAPI Server

A robust FastAPI-based REST API server with CRUD operations, request validation, and automatic documentation.

## Features

- ✨ Full CRUD operations for items and users
- 📝 Automatic API documentation (Swagger UI & ReDoc)
- 🔍 Search functionality with filters
- ✅ Request/response validation using Pydantic
- 🚀 High performance (on par with NodeJS and Go)
- 📦 In-memory database for quick prototyping
- 🔧 Easy to extend with real databases

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.9+
- **Server**: Uvicorn
- **Validation**: Pydantic
- **Documentation**: Swagger UI, ReDoc

## Prerequisites

- Python 3.9 or higher
- pip (Python package manager)
- virtualenv (recommended)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/fastapi-server.git
cd fastapi-server
```

> Create and Activate virtual environment

### 2. Install dependency

```bash
pip install -r requirements.txt
```

## Code in main.py

- Import library

  ```py
  from fastapi import FastAPI, HTTPException, Depends, Query
  from fastapi.responses import JSONResponse
  from pydantic import BaseModel
  from typing import Optional, List
  from datetime import datetime
  import uvicorn
  ```

- Create FastAPI instance

  ```py
  app = FastAPI(
      title="My FastAPI Server",
      description="A simple FastAPI server example",
      version="1.0.0"
  )
  ```

- Pydantic models for request/response

  ```py
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
  ```

- In-memory database (for demonstration)

  ```py
  items_db = {}
  users_db = {}
  ```

- Root endpoint

  ```py
  @app.get("/")
  async def root():
      return {
          "message": "Welcome to FastAPI Server",
          "docs": "/docs",
          "redoc": "/redoc"
      }
  ```
