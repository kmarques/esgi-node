const mongoose = require("mongoose");

module.exports = function (connection) {
  const ArticleSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    createdAt: Date,
  });

  const UserProlileSchema = new mongoose.Schema({
    _id: Number,
    lastname: String,
    firstname: String,
    Articles: [ArticleSchema],
  });

  return connection.model("UserProfile", UserProlileSchema);
};
