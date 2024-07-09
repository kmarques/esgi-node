const { UserMongo } = require("../../mongo");

module.exports = async function denormalizeUser(user, models) {
  const userDb = await models.User.findByPk(user.id, {
    attributes: [["id", "_id"], "lastname", "firstname"],
    include: {
      model: models.Article,
      attributes: [["id", "_id"], "title", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: 5,
    },
  });
  await UserMongo.findByIdAndUpdate(
    {
      _id: userDb._id,
    },
    userDb.dataValues,
    {
      upsert: true,
    }
  );
};
