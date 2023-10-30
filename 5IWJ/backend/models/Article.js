const { DataTypes, Model } = require("sequelize");
const userMongo = require("../dtos/denormalization/userMongo.js");

module.exports = function (connection) {
  class Article extends Model {
    static associate(db) {
      Article.belongsTo(db.User);
      db.User.hasMany(Article);
    }
    static addHooks(db) {
      Article.addHook("afterCreate", (article) =>
        userMongo(article.UserId, db.User, db.Article)
      );
      Article.addHook("afterUpdate", (article) =>
        userMongo(article.UserId, db.User, db.Article)
      );
      Article.addHook("afterDestroy", (article) =>
        userMongo(article.UserId, db.User, db.Article)
      );
    }
  }

  Article.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      title: DataTypes.STRING,
    },
    {
      sequelize: connection,
      tableName: "Article",
    }
  );

  return Article;
};
