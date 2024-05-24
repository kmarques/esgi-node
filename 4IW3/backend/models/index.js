const connection = require("./db");
const User = require("./User")(connection);

module.exports = {
  connection,
  User,
};
