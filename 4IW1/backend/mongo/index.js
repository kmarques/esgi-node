const fs = require("node:fs");
const path = require("node:path");
const connection = require("./db");

const files = fs.readdirSync(__dirname);
const db = {
  connection,
};
for (const file of files) {
  if (["index.js", "db.js"].includes(file)) continue;
  const model = require(path.join(__dirname, file))(connection);
  db[model.modelName] = model;
}

for (let modelName in db) {
  if (db[modelName] === connection) continue;
  if (db[modelName].associateToto) db[modelName].associateToto(db);
}

console.log(db);
module.exports = db;
