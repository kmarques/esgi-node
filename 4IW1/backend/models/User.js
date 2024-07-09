const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const denormalizeUser = require("../services/denormalization/user");

module.exports = function (connection) {
  class User extends Model {
    static associateToto(models) {
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

      User.addHook("afterCreate", (u) => denormalizeUser(u, models));
      User.addHook("afterUpdate", (u) => denormalizeUser(u, models));
      User.addHook("afterDestroy", (u) => denormalizeUser(u, models));
    }
  }

  User.init(
    {
      lastname: DataTypes.STRING,
      firstname: DataTypes.STRING,
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
