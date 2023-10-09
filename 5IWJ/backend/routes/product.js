const { Router } = require("express");
const { uuidv7 } = require("uuidv7");

function ProductRouter({ validator }) {
  const router = new Router();

  const products = [];

  router.get("/products", function (req, res) {
    // res.status(200).send(JSON.stringify(product)); <=>
    res.json(products);
  });

  router.post("/products", function (req, res, next) {
    try {
      const id = uuidv7();
      validator(req.body);
      const product = { id, ...req.body };
      products.push(product);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  });

  router.get("/products/:id", function (req, res, next) {
    const product = products.find((u) => u.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      // res.status(404).end(); <=>
      res.sendStatus(404);
    }
  });

  router.put("/products/:id", function (req, res, next) {
    try {
        validator(req.body);
      const id = req.params.id;
      let productIndex = products.findIndex((u) => u.id === id);
      const product = { id, ...req.body };
      let code = 200;
      if (productIndex === -1) {
        products.push(product);
        code = 201;
      } else {
        products.splice(productIndex, 1, product);
      }
      res.status(code).json(product);
    } catch (error) {
      next(error);
    }
  });

  router.patch("/products/:id", function (req, res, next) {
    try {
        validator(req.body);
      const id = req.params.id;
      const productIndex = products.findIndex((u) => u.id === id);
      if (productIndex === -1) {
        return res.sendStatus(404);
      }

      const product = { ...products[productIndex], ...req.body };
      products[productIndex] = product;
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/products/:id", function (req, res, next) {
    let deleted = false;
    products = products.filter((u) => {
      if (u.id === req.params.id) {
        deleted = true;
        return false;
      }
      return true;
    });
    res.sendStatus(deleted ? 204 : 404);
  });

  return router;
}

module.exports = ProductRouter;
