const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DB_URL, {
  useNewUrlParser: true,
});

connection.authenticate().then(() => {
  console.log("Connected to Postgres");
});

module.exports = connection;
