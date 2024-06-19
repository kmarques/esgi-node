const fs = require("fs");
const connection = require("./mongo");
//const Product = require("./Product")(connection);

const results = {
  connection,
};
const files = fs.readdirSync(__dirname);
files.forEach((file) => {
  if (["mongo.js", "index.js"].includes(file)) return;
  const model = require(`./${file}`)(connection);
  results[model.modelName] = model;
});

module.exports = results;
