// Create Post model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
  },
  {
    sequelize: connection,
    modelName: "post",
    paranoid: true,
  }
);

module.exports = Post;
