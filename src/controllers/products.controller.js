const jwt = require("jsonwebtoken");
const productService = require("../services/products.service");
const { success, error } = require("../utils/response");

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    return success(res, newProduct, "Producto creado exitosamente", 201);
  } catch (e) {
    return error(res, e.message, 500);
  }
};

const getProducts = async (req, res) => {
  try {
    const filter = req.body || {};
    const products = await productService.getProducts(filter);
    return success(res, products, "Consulta satisfactoria", 200);
  } catch (e) {
    return error(res, e, 500);
  }
};

const getProductById = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return error(res, "El ID del producto es requerido", 400);
    }
    const product = await productService.getProductById(_id);
    return success(res, product, "Consulta satisfactoria", 200);
  } catch (e) {
    return error(res, e, 500);
  }
};
module.exports = { createProduct, getProducts, getProductById };
