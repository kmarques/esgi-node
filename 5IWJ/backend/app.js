const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const UserRouter = require("./routes/genericDB");
const ProductRouter = require("./routes/product");
const BookRouter = require("./routes/generic");
const SecurityRouter = require("./routes/security");
const {Author, User} = require("./models");
const AuthorRouter = require("./routes/genericDB");
const ValidationError = require("./errors/ValidationError");
const checkAuth = require("./middlewares/checkAuth");
const ArticleRouter = require("./routes/article");
require('./mongo/db');

app.use(express.json());
app.use(cookieParser());

app.use(
  checkAuth({
    excludePaths: ["/login", "/register"],
  })
);

app.get(
  "/",
  function (req, res, next) {
    console.log("Middleware");
    if (req.query.stop == true) {
      res.send("From middleware");
    } else {
      next(new Error("fjdkngvjern"));
    }
  },
  function (req, res) {
    console.log("Middleware Controller");
    res.send("Hello World");
  }
);

app.post("/", function (req, res) {
  res.send("Hello from POST");
});

app.use(
  "/users",
  UserRouter({
    model: User,
  })
);
app.use(
  ProductRouter({
    validator: function (product) {
      if (!product.sku) {
        throw new Error("sku not defined");
      }
    },
  })
);
app.use(
  "/books",
  BookRouter({
    validator: function (book) {
      if (!book.ISBN) {
        throw new Error("ISBN not defined");
      }
    },
    //verbs: {
    //    cget: [checkAdmin],
    //    get: [checkAuth]
    //}
  })
);
app.use(
  "/authors",
  AuthorRouter({
    model: Author,
  })
);

app.use("/articles", ArticleRouter());

app.use(SecurityRouter);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(422).json(err.errors);
  } else if (err instanceof SyntaxError) {
    res.sendStatus(400);
  } else {
    console.log("Middleware d'erreur");
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = app;
