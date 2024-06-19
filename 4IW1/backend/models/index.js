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
  db[model.name] = model;
}

module.exports = db;
