const { Router } = require("express");
const { Article } = require("../models");
const checkAuth = require("../middlewares/checkAuth");

const router = new Router();

router.get("/articles", async (req, res) => {
  const articles = await Article.findAll({
    where: req.query,
  });
  res.json(articles);
});

router.get("/articles/:id", async (req, res) => {
  const article = await Article.findByPk(parseInt(req.params.id, 10));
  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

router.post("/articles", checkAuth, async (req, res, next) => {
  try {
    req.body.UserId = req.user.id;
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (e) {
    next(e);
  }
});

router.delete("/articles/:id", async (req, res) => {
  const result = await Article.destroy({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.put("/articles/:id", async (req, res, next) => {
  try {
    const deleted = await Article.destroy({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    const article = await Article.create(req.body);
    res.status(deleted ? 200 : 201).json(article);
  } catch (e) {
    next(e);
  }
});

router.patch("/articles/:id", async (req, res, next) => {
  try {
    const [nbUpdated, articles] = await Article.update(req.body, {
      where: {
        id: parseInt(req.params.id, 10),
      },
      individualHooks: true,
      returning: true,
    });
    if (nbUpdated) res.json(articles[0]);
    else res.sendStatus(404);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
