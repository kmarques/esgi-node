const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const connection = require("./db");

class User extends Model {}

User.init(
  {
    firstname: DataTypes.STRING(50),
    lastname: DataTypes.STRING(50),
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,32}$/,
        notEmpty: true,
        min: 8,
        max: 32,
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "admin",
    },
  },
  { sequelize: connection }
);

User.addHook("beforeCreate", async (user) => {
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
});

User.addHook("beforeUpdate", async (user, options) => {
  if (options.fields.includes("password")) {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  }
});

module.exports = User;
