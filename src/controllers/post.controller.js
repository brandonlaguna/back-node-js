const jwt = require("jsonwebtoken");
const postService = require("../services/post.service");
const { success, error } = require("../utils/response");

const getAll = async (req, res) => {
  try {
    const getAllPosts = await postService.getPosts();
    return success(res, getAllPosts, "Consulta satisfactoria", 200);
  } catch (e) {
    return error(res, e, 500);
  }
};

const getPostById = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return error(res, "El ID del post es requerido", 400);
    }
    const getPost = await postService.getPostById(_id);
    return success(res, getPost, "Consulta satisfactoria", 200);
  } catch (e) {
    return error(res, e, 500);
  }
};

const createPost = async (req, res) => {
  try {
    const postData = req.body;
    const newPost = await postService.createPost(postData);
    return success(res, newPost, "Post creado exitosamente", 201);
  } catch (e) {
    return error(res, e.message, 500);
  }
};

const createType = async (req, res) => {
  try {
    const typeData = req.body;
    const newType = await postService.createType(typeData);
    return success(res, newType, "Tipo de post creado exitosamente", 201);
  } catch (e) {
    return error(res, e.message, 500);
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await postService.getTypes();
    return success(res, types, "Consulta de tipos satisfactoria", 200);
  } catch (e) {
    return error(res, e.message, 500);
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return error(res, "No se ha proporcionado ninguna imagen", 400);
    }
    const protocol = req.protocol;
    const host = req.get("host");
    const url = `${protocol}://${host}/uploads/${req.file.filename}`;
    return success(res, { url }, "Imagen subida exitosamente", 201);
  } catch (e) {
    return error(res, e.message, 500);
  }
};

module.exports = {
  getAll,
  createPost,
  getPostById,
  createType,
  getTypes,
  uploadImage,
};
