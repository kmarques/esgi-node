const { DataTypes, Model } = require("sequelize");

module.exports = function (connection) {
  class Author extends Model {}

  Author.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      firstname: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          len: 5,
          notNull: true,
        },
        defaultValue: "unknown",
      },
      lastname: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          len: 5,
          notNull: true,
        },
      },
      dob: DataTypes.DATE,
    },
    {
      sequelize: connection,
      tableName: "author",
    }
  );

  return Author;
};
