module.exports = (mongoose) => {
  const ArticleSchema = new mongoose.Schema({
    title: String,
    owner: Object,
  });

  return mongoose.model("Article", ArticleSchema);
};
