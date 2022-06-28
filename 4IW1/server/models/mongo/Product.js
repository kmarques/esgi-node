const mongoose = require("./db");

const ProductSchema = new mongoose.Schema({
  title: String,
  quantity: Number,
  quantity2: Number,
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
