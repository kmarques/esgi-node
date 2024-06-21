const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = function (connection) {
  class User extends Model {
    static addHooks(models) {
      User.addHook("beforeCreate", async (user) => {
        user.password = await bcrypt.hash(
          user.password,
          await bcrypt.genSalt()
        );
      });
      User.addHook("beforeUpdate", async (user, { fields }) => {
        if (fields.includes("password"))
          user.password = await bcrypt.hash(
            user.password,
            await bcrypt.genSalt()
          );
      });
    }
  }

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
      firstname: DataTypes.STRING,
    },
    {
      sequelize: connection,
    }
  );

  return User;
};
