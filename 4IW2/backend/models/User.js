const { Model, DataTypes } = require("sequelize");

module.exports = function (connection, models) {
  class User extends Model {}

  User.init(
    {
      lastname: DataTypes.STRING(),
      firstname: DataTypes.STRING(),
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
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,32}$/,
        },
      },
    },
    {
      sequelize: connection,
    }
  );

  return User;
};
