const connection = require("./db");

const UserSchema = new connection.Schema({
  _id: String,
  firstname: String,
  lastname: String,
  Articles: Array,
});

const User = new connection.model('User', UserSchema);

module.exports = User;