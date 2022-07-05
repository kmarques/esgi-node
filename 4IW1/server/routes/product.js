const { Router } = require("express");
const formatError = require("../lib/formatError");
const { Product, mongoose } = require("../models/mongo");

const router = new Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(req.query);
    res.json(products);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(422).json(formatError(Object.values(error.errors)));
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (!product) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.error(error);
      res.status(422).json(formatError(Object.values(error.errors)));
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
