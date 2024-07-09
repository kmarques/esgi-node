const mongoose = require("mongoose");

module.exports = function (connection) {
  const ArticleSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    createdAt: Date,
  });
  const UserSchema = new mongoose.Schema({
    _id: Number,
    lastname: String,
    firstname: String,
    articles: [ArticleSchema],
  });

  const User = connection.model("User", UserSchema);

  return User;
};
