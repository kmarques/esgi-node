const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1y",
    algorithm: "HS512",
  });
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      id: decoded.id,
      name: decoded.name,
    };
  } catch (error) {
    return null;
  }
};
