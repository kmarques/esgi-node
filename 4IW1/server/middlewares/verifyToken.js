const { verifyToken } = require("../lib/jwt");

module.exports = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.sendStatus(401);
  }
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") {
    return res.sendStatus(401);
  }
  const user = verifyToken(token);
  if (!user) {
    return res.sendStatus(401);
  }
  req.user = user;
  next();
};
