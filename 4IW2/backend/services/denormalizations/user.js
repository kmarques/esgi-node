const { Article, User } = require("../../models");

module.exports = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "lastname", "firstname"],
    includes: {
      model: Article,
      attributes: ["id", "title", "updatedAt"],
      limit: 5,
      order: [["createdAt", "DESC"]],
    },
  });

  UserMongo.findByIdAndUpdate(user.id, user.json(), {
    upsert: true,
    new: true,
  });
};
