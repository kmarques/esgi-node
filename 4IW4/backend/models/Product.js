const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User);
    }
  }

  Product.init(
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

  return Product;
};
