const { Router } = require("express");
const authMiddleware = require("../utils/authMiddleWare");
const productsController = require("../controllers/products.controller");
const { upload } = require("../utils/multerMiddleWare");

const router = Router();

router.post(
  "/create",
  authMiddleware("CREATE_PRODUCT"),
  productsController.createProduct
);
router.post("/getAll", productsController.getProducts);
router.post("/getById", productsController.getProductById);

module.exports = router;
