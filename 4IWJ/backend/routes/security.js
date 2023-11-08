const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.sendStatus(401);
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.sendStatus(401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30 days",
      algorithm: "HS256",
    }
  );

  res.cookie("JWT", token, {
    httpOnly: true,
    signed: true,
  });

  res.json(user);
});

module.exports = router;
