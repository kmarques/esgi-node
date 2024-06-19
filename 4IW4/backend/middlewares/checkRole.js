module.exports = function (options = {}) {
  const allowedRoles = Array.isArray(options.roles)
    ? options.roles
    : [options.roles];

  return function (req, res, next) {
    const user = req.user;
    if (!user) res.sendStatus(401);
    if (allowedRoles.includes(user.role)) {
      req.roles = [user.role];
      next();
    } else res.sendStatus(403);
  };
};
