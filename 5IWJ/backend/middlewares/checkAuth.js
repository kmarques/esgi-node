const { verifyToken } = require("../services/token");

module.exports = function ({ excludePaths = [] } = {}) {
  console.log(excludePaths);
  return function (req, res, next) {
    if (excludePaths.includes(req.path)) return next();
    const token = req.cookies.jwt;
    if (!token) return res.sendStatus(401);
    const proxyUser = verifyToken(token);
    req.user = proxyUser;
    next();
  };
};
