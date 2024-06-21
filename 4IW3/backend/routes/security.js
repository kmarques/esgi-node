const { Router } = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.sendStatus(401);
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.sendStatus(401);
  }

  const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET);

  res.json({
    token,
  });
});

module.exports = router;
