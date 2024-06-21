module.exports = async function checkAuth(req, res, next) {
  const header = req.headers.Authorization ?? req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.user_id);
    if (!user) return res.sendStatus(401);
    req.user = user;

    next();
  } catch (e) {
    res.sendStatus(401);
  }
};
