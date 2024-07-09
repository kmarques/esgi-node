const { Router } = require("express");
const { User } = require("../models");
const checkAuth = require("../middlewares/checkAuth");

const router = new Router();

router.get("/users", async (req, res, next) => {
  const users = await User.findAll({
    where: req.query,
  });
  res.json(users);
});

router.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

router.get("/users/:id", async (req, res, next) => {
  const user = await User.findByPk(parseInt(req.params.id, 10));
  if (user) res.json(user);
  else res.sendStatus(404);
});

router.delete("/users/:id", checkAuth, async (req, res, next) => {
  const nbDeleted = await User.destroy({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });
  if (nbDeleted === 1) res.sendStatus(204);
  else {
    res.sendStatus(404);
  }
});

router.put("/users/:id", checkAuth, async (req, res, next) => {
  try {
    const nbDeleted = await User.destroy({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    const user = await User.create(req.body);
    res.status(nbDeleted === 1 ? 200 : 201).json(user);
  } catch (e) {
    next(e);
  }
});

router.patch("/users/:id", checkAuth, async (req, res, next) => {
  try {
    const [nbUpdated, users] = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id, 10),
      },
      returning: true,
      individualHooks: true,
    });
    if (nbUpdated === 1) res.json(users[0]);
    else res.sendStatus(404);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
