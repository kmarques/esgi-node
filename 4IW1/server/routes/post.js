const { Router } = require("express");
const { Post, User } = require("../models/postgres");
const { ValidationError } = require("sequelize");
const formatError = require("../lib/formatError");

const router = new Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: req.query,
      include: [{ model: User, as: "user", attributes: ["id", "name"] }],
    });
    res.json(posts);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json(formatError(error.errors));
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.put("/posts/:id", async (req, res) => {
  try {
    const result = await Post.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    });
    const [, lines] = result;
    if (!lines[0]) {
      res.sendStatus(404);
    } else {
      res.json(lines[0]);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error);
      res.status(422).json(formatError(error.errors));
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const nbLine = await Post.destroy({ where: { id: req.params.id } });
    if (!nbLine) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.sendStatus(404);
    } else {
      res.json(post);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
