const express = require("express");

const app = express();

app.get("/", (request, response, next) => {
  response.send("Healthy");
});

module.exports = app;
