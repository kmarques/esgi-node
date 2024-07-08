const { Router } = require("express");
const { Article } = require("../models");
const checkAuth = require("../middlewares/checkAuth");

const router = new Router();

router.get("/articles", async (req, res, next) => {
  const articles = await Article.findAll({
    where: req.query,
  });
  res.json(articles);
});

router.post(
  "/articles",
  checkAuth,
  //checkRole("WRITER", "ADMIN"),
  //injectUser({
  //  part: "body",
  //  key: "UserId",
  //}),
  async (req, res, next) => {
    try {
      req.body.UserId = req.user.id;
      const article = await Article.create(req.body);
      res.status(201).json(article);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);

router.get("/articles/:id", async (req, res, next) => {
  const article = await Article.findByPk(parseInt(req.params.id, 10));
  if (article) return res.json(article);
  return res.sendStatus(404);
});

router.delete("/articles/:id", async (req, res, next) => {
  const result = await Article.destroy({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  if (result === 1) return res.sendStatus(204);
  return res.sendStatus(404);
});

router.put("/articles/:id", async (req, res, next) => {
  try {
    const nbDeleted = await Article.destroy({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    const article = await Article.create({
      id: parseInt(req.params.id, 10),
      ...req.body,
    });
    res.status(nbDeleted ? 200 : 201).json(article);
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
      returning: true,
    });

    if (nbUpdated === 1) {
      res.json(articles[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
