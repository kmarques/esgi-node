const { DataTypes, Model } = require("sequelize");
const userMongo = require("../dtos/denormalization/userMongo.js");

module.exports = function (connection) {
  class User extends Model {
    static addHooks(db) {
      User.addHook("afterCreate", (user) =>
        userMongo(user.id, db.User, db.Article)
      );
      User.addHook("afterUpdate", (user) =>
        userMongo(user.id, {User: db.User, Article: db.Article, onlyRemove: true})
      );
    }
  }

  User.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      firstname: DataTypes.STRING(45),
      lastname: DataTypes.STRING(45),
      email: {
        type: DataTypes.TEXT,
        validate: {
          max: 320,
          notNull: true,
        },
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        validate: {
          max: 320,
          notNull: true,
          //is: {
          //  args: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          //  msg: "Password must be at least 8 characters long and contain at least one letter and one number",
          //},
        },
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      tableName: "user",
    }
  );

  User.addHook("beforeCreate", async function (user) {
    const bcrypt = require("bcryptjs");
    const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    user.password = hash;
  });

  User.addHook("beforeUpdate", async function (user, { fields }) {
    if (fields.includes("password")) {
      const bcrypt = require("bcryptjs");
      const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
      user.password = hash;
    }
  });

  return User;
};
