const { Router } = require("express");
const { uuidv7 } = require("uuidv7");
const ValidationError = require("../errors/ValidationError");

function ItemRouter({ model: Model }) {
  const router = new Router();

  router.get("/", async function (req, res) {
    const items = await Model.findAll({
      where: req.query,
    });
    res.json(items);
  });

  router.post("/", async function (req, res, next) {
    try {
      const id = uuidv7();
      const item = await Model.create({ id, ...req.body });
      res.status(201).json(item);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = ValidationError.fromSequelize(error);
      }
      next(error);
    }
  });

  router.get("/:id", async function (req, res) {
    const item = await Model.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  });

  router.put("/:id", async function (req, res, next) {
    try {
      const id = req.params.id;
      const [nbDeleted] = await Model.destroy({ where: { id } });
      const item = await Model.create({ id, ...req.body });
      res.status(nbDeleted ? 200 : 201).json(item);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = ValidationError.fromSequelize(error);
      }
      next(error);
    }
  });

  router.patch("/:id", async function (req, res, next) {
    try {
      const id = req.params.id;
      console.log(req.body)
      const [_, items] = await Model.update(req.body, {
        where: { id },
        returning: true,
        individualHooks: true,
      });
      if (!items.length) {
        res.sendStatus(404);
      } else {
        res.json(items[0]);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = ValidationError.fromSequelize(error);
      }
      next(error);
    }
  });

  router.delete("/:id", async function (req, res) {
    const [nbDeleted] = await Model.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(nbDeleted ? 204 : 404);
  });

  return router;
}

module.exports = ItemRouter;
