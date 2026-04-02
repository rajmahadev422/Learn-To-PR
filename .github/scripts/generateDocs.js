const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "../../doc");

function getFolders() {
  const items = fs.readdirSync(baseDir, { withFileTypes: true });

  return items
    .filter(item => item.isDirectory()) // ✅ only folders
    .map(item => item.name);
}

const folders = getFolders();

fs.writeFileSync("docs.json", JSON.stringify(folders, null, 2));

console.log("docs.json updated with folders only");