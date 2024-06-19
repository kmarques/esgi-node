const { User: UserMongo } = require("../../mongo");

module.exports = async function denormalizeUser(user, models) {
  const User = models.User;
  const userDenormalized = await User.findByPk(user.id, {
    attributes: ["id", "lastname", "firstname"],
    include: {
      model: models.Article,
      attributes: ["id", "title", "updatedAt"],
      where: {
        status: "PUBLISHED",
      },
      order: [["updatedAt", "DESC"]],
      limit: 5,
    },
  });

  const userMongo = await UserMongo.findByIdAndUpdate(
    user.id,
    userDenormalized.toJSON(),
    {
      upsert: true,
      new: true,
    }
  );
  console.log(userDenormalized.toJSON(), userMongo);
};
