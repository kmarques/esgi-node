const { verifyToken } = require("../lib/tokenManager.js");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  console.log(auth);
  if (!auth) {
    console.log("no auth");
    return res.sendStatus(401);
  }
  const [type, token] = auth.split(" ");
  if (type !== "Bearer") {
    return res.sendStatus(401);
  }
  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
