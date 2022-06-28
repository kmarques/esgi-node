const express = require("express");
const ProductRouter = require("./routes/product");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res, next) => {
  console.log("test");
  res.json({
    title: "coucou",
  });
});

app.use("/api", ProductRouter);
app.use(ProductRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT);
});
