const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Mongo connected");
});

module.exports = mongoose;
