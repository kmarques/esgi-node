module.exports =
  ({ roles = [] }) =>
  async (req, res, next) => {
    if (!req.user) return res.sendStatus(500);
    if (!roles.includes(req.user.role)) return res.sendStatus(403);

    next();
  };
