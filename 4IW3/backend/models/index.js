const fs = require("node:fs");
const path = require("node:path");
const connection = require("./db");
const User = require("./User")(connection);

const db = {
  connection,
};

const files = fs.readdirSync(__dirname);
for (const file of files) {
  if (["db.js", "index.js"].includes(file)) continue;
  const model = require(path.join(__dirname, file))(connection);
  db[model.name] = model;
}

for (const modelName in db) {
  if (db[modelName] === connection) continue;
  if (db[modelName].addHooks) {
    db[modelName].addHooks(db);
  }
}

module.exports = db;
