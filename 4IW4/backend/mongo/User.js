const mongoose = require("mongoose");

module.exports = function (connection) {
  const UserSchema = new mongoose.Schema({
    _id: Number,
    lastname: String,
    firstname: String,
    Articles: Array,
  });

  const User = connection.model("User", UserSchema);

  return User;
};
