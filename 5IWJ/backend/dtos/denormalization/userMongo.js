const UserMongo = require("../../mongo/User");

module.exports = async function (userId, User, Article) {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Article,
        attributes: ["id", "title", "createdAt"],
        order: [["createdAt", "DESC"]],
        limit: 5,
      },
    ],
  });
  await UserMongo.deleteOne({ _id: userId });

  const userMongo = new UserMongo({
    _id: userId,
    ...user.dataValues,
    Articles: user.Articles.map((article) => article.dataValues),
  });
  await userMongo.save();
};
