const { array_intersect } = require("../../lib/arrayUtils");
const { UserProfile } = require("../../mongo");

async function denormalizeProfile(userId, models) {
  const user = await models.User.findByPk(userId, {
    attributes: ["id", "lastname", "firstname"],
    include: {
      model: models.Article,
      attributes: [["id", "_id"], "title", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: 5,
    },
  });

  await UserProfile.findByIdAndUpdate(user.id, user.toJSON(), {
    upsert: true,
    new: true,
  });
}

denormalizeProfile.deps = {
  User: ["lastname", "firstname"],
  Article: ["title", "createdAt"],
};

denormalizeProfile.accept = function (model, fields) {
  return (
    array_intersect(denormalizeProfile.deps[model.name], fields).length > 0
  );
};

module.exports = denormalizeProfile;
