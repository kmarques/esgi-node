const mongoose = require("./db");

const HttpCodeSchema = new mongoose.Schema({
  code: Number,
  message: String,
});

const HttpCode = new mongoose.model("HttpCode", HttpCodeSchema);

module.exports = HttpCode;
