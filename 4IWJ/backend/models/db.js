const { Sequelize } = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL);

connection.authenticate().then(() => {
  console.log("Database connection has been established successfully.");
});

module.exports = connection;
