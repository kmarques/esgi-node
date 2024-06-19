const { Model, DataTypes } = require("sequelize");
const denormalizeUser = require("../services/denormalization/user");

module.exports = function (connection) {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User);
    }

    static addHooks(models) {
      Article.addHook("afterCreate", (article) => {
        denormalizeUser({ id: article.UserId }, models);
      });
      Article.addHook("afterUpdate", (article, { fields }) => {
        if (fields.includes("title") || fields.includes("updatedAt"))
          denormalizeUser({ id: article.UserId }, models);
      });
    }
  }

  Article.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("DRAFT", "PUBLISHED"),
        allowNull: false,
        defaultValue: "DRAFT",
        validate: {
          isIn: [["DRAFT", "PUBLISHED"]],
        },
      },
    },
    {
      sequelize: connection,
    }
  );

  return Article;
};
