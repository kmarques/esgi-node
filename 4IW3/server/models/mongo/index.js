exports.mongoose = require("./db");
exports.HttpCode = require("./HttpCode")(exports.mongoose);
exports.Article = require("./Article")(exports.mongoose);
