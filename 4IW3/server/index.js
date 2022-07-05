const express = require("express");
const port = process.env.PORT || 3000;
const HttpRouter = require("./routes/httpCodes");
const UserRouter = require("./routes/users");
const SecurityRouter = require("./routes/security");
const checkAuthentication = require("./middlewares/checkAuthentication");
const app = express();

app.use(express.json());

app.get("/", (_, res, __) => {
  res.send("Hello World!");
});

app.use(SecurityRouter);
app.use(UserRouter);
app.use(checkAuthentication, HttpRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
