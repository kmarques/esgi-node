const { Router } = require("express");
const { uuidv7 } = require("uuidv7");
const ValidationError = require("../errors/ValidationError");
const { Article, User } = require("../models");

function ArticleRouter() {
  const router = new Router();

  router.get("/", async function (req, res) {
    const items = await Article.findAll({
      where: req.query,
      attributes: { exclude: ["UserId"] },
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    res.json(items);
  });

  router.post("/", async function (req, res, next) {
    try {
      const id = uuidv7();
      const item = await Article.create({ id, ...req.body });
      res.status(201).json(item);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = ValidationError.fromSequelize(error);
      }
      next(error);
    }
  });

  return router;
}

module.exports = ArticleRouter;
