const fs = require("fs");
const { Model } = require("sequelize");
const connection = require("./db");
//const Product = require("./Product")(connection);

const results = {
  connection,
};
const files = fs.readdirSync(__dirname);
files.forEach((file) => {
  if (["db.js", "index.js"].includes(file)) return;
  const model = require(`./${file}`)(connection);
  results[model.name] = model;
});

for (const model in results) {
  if (results[model] === connection) continue;
  if (results[model].associate) {
    results[model].associate(results);
  }
  if (results[model].addHooks) {
    results[model].addHooks(results);
  }
}

module.exports = results;
