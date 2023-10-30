const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(() => console.log("MongoDB connected"));

module.exports = mongoose;