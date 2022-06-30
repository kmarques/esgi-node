const { Router } = require("express");
const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");

const router = new Router();

router.get("/users", async (req, res) => {
  try {
    const result = await User.findAll({ where: req.query });
    res.json(result);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error);
      res.status(422).json({
        code: "must be an integer",
        message: "must have at least 1 character",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const nbline = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!nbline) {
      res.sendStatus(404);
    } else res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const [, rows] = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (!rows[0]) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        code: "must be an integer",
        message: "must have at least 1 character",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const result = await User.findByPk(req.params.id);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
