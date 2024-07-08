const express = require("express");
const userRouter = require("./routes/users.js");
const articleRouter = require("./routes/articles.js");
const securityRouter = require("./routes/security.js");

const checkAuth = require("./middlewares/checkAuth.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  /*checkAuth, */ (request, response, next) => {
    response.send("Healthy");
  }
);

app.use(securityRouter);
app.use(userRouter);
app.use(articleRouter);

app.get("/protected", checkAuth, (req, res) => {
  res.send("Protected area : Welcome " + req.user.id);
});

module.exports = app;
