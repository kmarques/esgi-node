const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const denormalizeUser = require("../services/denormalizations/user");

module.exports = function (connection, models) {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Article);
    }

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

      //User.addHook("afterCreate", (user) => denormalizeUser(user.id));
      User.addHook("afterUpdate", (user, { fields }) => {
        if (fields.includes("lastname") || fields.includes("firstname"))
          denormalizeUser(user.id);
      });
    }
  }

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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ROLE_USER",
      },
    },
    {
      sequelize: connection,
    }
  );

  return User;
};
