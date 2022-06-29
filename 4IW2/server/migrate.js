const { sequelize } = require("./models/postgres");

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  sequelize.close();
});
