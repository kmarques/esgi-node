const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

app.get("/json", (req, res, next) => {
  res.json({ coucou: "world" });
});

module.exports = app;
