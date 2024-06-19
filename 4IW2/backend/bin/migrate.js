const { connection: db } = require("../models");

db.sync({
  alter: true,
})
  .then(() => console.log("Database synced"))
  .then(() => db.close());
