const express = require("express");
const port = process.env.PORT || 3000;
const HttpRouter = require("./routes/httpCodes");
const app = express();

app.use(express.json());

app.get("/", (_, res, __) => {
  res.send("Hello World!");
});

app.use(HttpRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
