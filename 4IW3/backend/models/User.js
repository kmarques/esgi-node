const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const denormalizeProfile = require("../services/dernormalization/profile");

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

      User.addHook("afterCreate", (user) => {
        denormalizeProfile(user.id, models);
      });
      User.addHook("afterUpdate", (user, { fields }) => {
        if (denormalizeProfile.accept(User, fields)) {
          denormalizeProfile(user.id, models);
        }
      });
    }

    static associate(models) {
      User.hasMany(models.Article);
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
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,32}$/,
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
