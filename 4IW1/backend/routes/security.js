const { Router } = require("express");
const { User } = require("../models");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) res.sendStatus(401);
  if (!(await bcrypt.compare(req.body.password, user.password)))
    res.sendStatus(401);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.json(token);
});

module.exports = router;
