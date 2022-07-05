const { connection } = require("./models/postgres");

connection
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    connection.close();
  });
