const { Router } = require("express");
const { uuidv7 } = require("uuidv7");

function ItemRouter({ validator }) {
  const router = new Router();

  const items = [];

  router.get("/", function (req, res) {
    // res.status(200).send(JSON.stringify(item)); <=>
    res.json(items);
  });

  router.post("/", function (req, res, next) {
    try {
      const id = uuidv7();
      validator(req.body);
      const item = { id, ...req.body };
      items.push(item);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", function (req, res, next) {
    const item = items.find((u) => u.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      // res.status(404).end(); <=>
      res.sendStatus(404);
    }
  });

  router.put("/:id", function (req, res, next) {
    try {
        validator(req.body);
      const id = req.params.id;
      let itemIndex = items.findIndex((u) => u.id === id);
      const item = { id, ...req.body };
      let code = 200;
      if (itemIndex === -1) {
        items.push(item);
        code = 201;
      } else {
        items.splice(itemIndex, 1, item);
      }
      res.status(code).json(item);
    } catch (error) {
      next(error);
    }
  });

  router.patch("/:id", function (req, res, next) {
    try {
        validator(req.body);
      const id = req.params.id;
      const itemIndex = items.findIndex((u) => u.id === id);
      if (itemIndex === -1) {
        return res.sendStatus(404);
      }

      const item = { ...items[itemIndex], ...req.body };
      items[itemIndex] = item;
      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", function (req, res, next) {
    let deleted = false;
    items = items.filter((u) => {
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

module.exports = ItemRouter;
