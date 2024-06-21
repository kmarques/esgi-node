const { Router } = require("express");
const { Article } = require("../models");
const checkAuth = require("../middlewares/checkAuth");

const router = new Router();

router.get("/articles", async (req, res, next) => {
  const articles = await Article.findAll({ where: req.query });

  res.json(articles);
});

router.get("/articles/:id", async (req, res, next) => {
  const article = await Article.findByPk(parseInt(req.params.id, 10));
  if (article) res.json(article);
  else res.sendStatus(404);
});

//router.use(checkAuth);

router.post("/articles", checkAuth, async (req, res, next) => {
  try {
    const article = await Article.create({ UserId: req.user.id, ...req.body });
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

router.delete("/articles/:id", async (req, res, next) => {
  const result = await Article.destroy({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  if (result === 1) res.sendStatus(204);
  else {
    res.sendStatus(404);
  }
});

router.put("/articles/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const nbDeleted = await Article.destroy({
      where: {
        id,
      },
    });
    const article = await Article.create({ id, ...req.body });
    res.status(nbDeleted === 1 ? 200 : 201).json(article);
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
    if (nbUpdated === 1) return res.json(articles[0]);
    res.sendStatus(404);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
