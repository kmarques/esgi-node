const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((e) => {
    console.error("Mongo connection failed", e.message);
  });

module.exports = mongoose.connection;
