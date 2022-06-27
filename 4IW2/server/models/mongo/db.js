const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) console.error(err);
  else console.log("Mongoose connected");
});

module.exports = mongoose;
