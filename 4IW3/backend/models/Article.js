const { Model, DataTypes } = require("sequelize");
const denormalizeProfile = require("../services/dernormalization/profile");

module.exports = function (connection) {
  class Article extends Model {
    static addHooks(models) {
      Article.addHook("afterCreate", (article) => {
        denormalizeProfile(article.UserId, models);
      });
      Article.addHook("afterUpdate", (article, { fields }) => {
        if (denormalizeProfile.accept(Article, fields)) {
          denormalizeProfile(article.UserId, models);
        }
      });
    }
    static associate(models) {
      Article.belongsTo(models.User);
    }
  }

  Article.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.ENUM("DRAFT", "PUBLISHED"),
    },
    {
      sequelize: connection,
    }
  );

  return Article;
};
