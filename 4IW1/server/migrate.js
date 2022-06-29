const { connection } = require("./models/postgres");

connection
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("Database synced");
    connection.close();
  });
