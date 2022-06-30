module.exports = (mongoose) => {
  const HttpCodeSchema = new mongoose.Schema({
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    description: String,
  });

  return mongoose.model("HttpCode", HttpCodeSchema);
};
