const { Router } = require("express");
const { createToken } = require("../lib/jwt");
const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");

const router = new Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({
        email: "Email not found",
      });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({
        password: "Password is incorrect",
      });
    }
    res.json({
      token: createToken(user),
    });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        quantity: "must be greather than 0",
        title: "must not be empty",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

module.exports = router;
