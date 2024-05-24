const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Article);
    }
  }

  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
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
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]){8,}$/,
        },
      },
    },
    {
      sequelize: connection,
    }
  );

  return User;
};
