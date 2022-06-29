const mongoose = require("./db");

const PostSchema = new mongoose.Schema({
  title: String,
  user: Object,
});

const Post = new mongoose.model("Post", PostSchema);

module.exports = Post;
