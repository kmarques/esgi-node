const express = require("express");
const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const securityRouter = require("./routes/security");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

app.get("/json", (req, res, next) => {
  res.json({ coucou: "world" });
});

app.use(securityRouter);
app.use(userRouter);
app.use(articleRouter);

module.exports = app;
