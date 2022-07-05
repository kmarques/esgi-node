exports.connection = require("./db");
exports.User = require("./User");
exports.Post = require("./Post");

exports.User.hasMany(exports.Post);
exports.Post.belongsTo(exports.User);

function denormalizePost(post) {
  exports.Post.findByPk(post.id, {
    include: [
      {
        model: exports.User,
        as: "author",
        attributes: ["id", "firstName"],
      },
    ],
  }).then((result) => {
    PostMongo.findOneAndUpdate(
      { _id: post.id },
      { $set: result.dataValues },
      { upsert: true }
    );
  });
}

exports.User.addHook("afterUpdate", (user) => {
  exports.Post.findAll({
    include: [
      {
        model: exports.User,
        as: "author",
        where: { id: user.id },
      },
    ],
  }).then((posts) => {
    posts.forEach((post) => {
      denormalizePost(post);
    });
  });
});

exports.Post.addHook("afterCreate", denormalizePost);
exports.Post.addHook("afterUpdate", denormalizePost);
exports.Post.addHook("afterDestroy", (post) => {
  PostMongo.deleteOne({ _id: post.id });
});
