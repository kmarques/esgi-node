const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        },
      },
      lastname: DataTypes.STRING,
    },
    {
      sequelize: connection,
    }
  );

  return User;
};
