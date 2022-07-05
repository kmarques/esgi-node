const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Article extends Model {}

Article.init(
  {
    title: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "article",
  }
);

module.exports = Article;
