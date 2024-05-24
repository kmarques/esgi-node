const { connection } = require("./models");

const key = process.argv[2]?.slice(2) ?? "alter";

connection
  .sync({
    [key]: true,
  })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());
