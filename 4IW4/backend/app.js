const express = require("express");
const checkAuth = require("./middlewares/checkAuth");
const checkRole = require("./middlewares/checkRole");
const userRouter = require("./routes/users");
const securityRouter = require("./routes/security");
const articleRouter = require("./routes/article");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.send("Healthy");
});

app.get("/protected", checkAuth, (request, response, next) => {
  response.send("Protected area");
});
app.get(
  "/protected/admin",
  checkAuth,
  checkRole({ roles: "ADMIN" }),
  (request, response, next) => {
    response.send("Protected area ADMIN");
  }
);

app.use(securityRouter);

//app.use(checkAuth);
app.use(userRouter);
app.use(articleRouter);
module.exports = app;
