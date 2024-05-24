const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User);
    }
  }

  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
    }
  );

  return Article;
};
