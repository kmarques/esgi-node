const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

module.exports = async function (req, res, next) {
  const header = req.headers.Authorization ?? req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") return res.sendStatus(401);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.userId);
    if (!user) return res.sendStatus(401);
    req.user = user;
  } catch (e) {
    console.error(e.message);
    return res.sendStatus(401);
  }
};
