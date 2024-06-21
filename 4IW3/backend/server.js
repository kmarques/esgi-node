const express = require("express");
const userRouter = require("./routes/users.js");
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

app.use(userRouter);

app.get("/protected", checkAuth, (req, res) => {
  res.send("Protected area : Welcome " + req.user.id);
});

app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT)
);
