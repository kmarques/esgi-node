const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Article extends Model {
    static associateToto(models) {
      Article.belongsTo(models.User);
    }
  }

  Article.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("DRAFT", "PUBLISHED"),
        allowNull: false,
      },
    },
    {
      sequelize: connection,
    }
  );

  return Article;
};
