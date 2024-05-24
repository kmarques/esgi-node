const { Router } = require("express");
const { User } = require("../models");

const router = new Router();

router.get("/users", async (req, res) => {
  const users = await User.findAll({
    where: req.query,
  });
  res.json(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

router.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  const result = await User.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
