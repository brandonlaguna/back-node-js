const Post = require("../models/Post");
const Type = require("../models/Type");
// Servicio

const createPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};

const getPosts = async (filter = {}) => {
  return await Post.find(filter)
    .populate("postBy", "name email")
    .populate("TYPE", "name");
};

const getPostById = async (id) => {
  return await Post.findById(id)
    .populate(
      "postBy",
      "name email description email phone address photo birthDate facebookId instagramId twitterId linkedinId"
    )
    .populate("TYPE", "name");
};

const createType = async (data) => {
  const type = new Type(data);
  return await type.save();
};

const getTypes = async () => {
  return await Type.find();
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  createType,
  getTypes,
};
