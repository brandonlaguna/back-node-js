const Products = require("../models/Products");

const createProduct = async (data) => {
  const product = new Products(data);
  return await product.save();
};

const getProducts = async (filter = {}) => {
  const limit = filter.limit || 0;
  return await Products.find().sort({ $natural: -1 }).limit(limit);
};

const getProductById = async (id) => {
  return await Products.findById(id);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
};
