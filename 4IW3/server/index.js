const express = require("express");
const port = process.env.PORT || 3000;
const HttpRouter = require("./routes/httpCodes");
const UserRouter = require("./routes/users");
const app = express();

app.use(express.json());

app.get("/", (_, res, __) => {
  res.send("Hello World!");
});

app.use(HttpRouter);
app.use(UserRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
