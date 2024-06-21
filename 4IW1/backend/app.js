const express = require("express");
const userRouter = require("./routes/user");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Hello world");
});
app.get("/json", (req, res, next) => {
  res.json({ message: "Hello world" });
});

app.use(userRouter);

module.exports = app;
