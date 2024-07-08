const fs = require("node:fs");
const path = require("node:path");
const connection = require("./db");

const db = {
  connection,
};

const files = fs.readdirSync(__dirname);
for (const file of files) {
  if (["db.js", "index.js"].includes(file)) continue;
  const model = require(path.join(__dirname, file))(connection);
  console.log(model, model.name);
  db[model.modelName] = model;
}
console.log(db);
module.exports = db;
