const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const HttpCodesRouter = require("./routes/HttpCode");

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

//app.use(HttpCodesRouter);
app.use("/http-codes", HttpCodesRouter);

app.listen(port, () => console.log(`Server started ${port}`));
