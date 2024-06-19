const { Router } = require("express");
const { User } = require("../models");

const router = new Router();

router.get("/users", async (req, res, next) => {
  const users = await User.findAll({ where: req.query });

  res.json(users);
});

router.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (req, res, next) => {
  const user = await User.findByPk(parseInt(req.params.id, 10));
  if (user) res.json(user);
  else res.sendStatus(404);
});

router.delete("/users/:id", async (req, res, next) => {
  const result = await User.destroy({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  if (result === 1) res.sendStatus(204);
  else {
    res.sendStatus(404);
  }
});

module.exports = router;
