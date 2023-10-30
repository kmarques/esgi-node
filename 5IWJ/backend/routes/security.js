const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const ValidationError = require("../errors/ValidationError");
const { createToken } = require("../services/token");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(
        new ValidationError({
          email: "Invalid credentials",
          password: "Invalid credentials",
        })
      );
    }
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return next(
        new ValidationError({
          email: "Invalid credentials",
          password: "Invalid credentials",
        })
      );
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return next(
        new ValidationError({
          password: "Invalid credentials",
        })
      );
    }

    const token = createToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
    });

    return res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
