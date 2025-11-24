const { Router } = require("express");
const authMiddleware = require("../utils/authMiddleWare");
const postController = require("../controllers/post.controller");
const { upload } = require("../utils/multerMiddleWare");

const router = Router();

router.post(
  "/create",
  authMiddleware("CREATE_POST"),
  postController.createPost
);

router.post("/getAll", postController.getAll);

router.post("/getById", postController.getPostById);

router.post(
  "/createType",
  authMiddleware("CREATE_POST_TYPE"),
  postController.createType
);

router.post("/getTypes", postController.getTypes);

router.post("/uploadImage", upload.single("file"), postController.uploadImage);

module.exports = router;
