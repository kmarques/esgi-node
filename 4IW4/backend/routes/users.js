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
  const user = await User.findByPk(parseInt(req.params.id, 10));
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
      id: parseInt(req.params.id, 10),
    },
  });

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.put("/users/:id", async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    const user = await User.create(req.body);
    res.status(deleted ? 200 : 201).json(user);
  } catch (e) {
    next(e);
  }
});

router.patch("/users/:id", async (req, res, next) => {
  try {
    const [nbUpdated, users] = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id, 10),
      },
      individualHooks: true,
      returning: true,
    });
    if (nbUpdated) res.json(users[0]);
    else res.sendStatus(404);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
