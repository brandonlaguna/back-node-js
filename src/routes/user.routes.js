const { Router } = require("express");
const authMiddleware = require("../utils/authMiddleWare");
const {
  getIdNameByTypeUser,
  getUsersByTypePublic,
} = require("../controllers/user.controller");

const router = Router();

router.post("/getIdName", authMiddleware("GET_USERS"), getIdNameByTypeUser);

router.post("/getUsers", getUsersByTypePublic);

module.exports = router;
