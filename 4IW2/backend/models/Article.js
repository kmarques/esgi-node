const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User);
    }

    static addHooks(models) {
      Article.addHook("afterCreate", (article) =>
        denormalizeUser(article.UserId)
      );
      Article.addHook("afterUpdate", (article, { fields }) => {
        if (fields.includes("title") || fields.includes("updatedAt"))
          denormalizeUser(article.UserId);
      });
    }
  }

  Article.init(
    {
      title: DataTypes.STRING(),
      content: DataTypes.STRING(),
      status: {
        type: DataTypes.ENUM("DRAFT", "PUBLISHED"),
      },
    },
    {
      sequelize: connection,
    }
  );

  return Article;
};
