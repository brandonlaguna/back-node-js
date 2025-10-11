const { Router } = require("express");
const authMiddleware = require("../utils/authMiddleWare");
const { getIdNameByTypeUser } = require("../controllers/user.controller");

const router = Router();

router.post("/getIdName", authMiddleware("GET_USERS"), getIdNameByTypeUser);

module.exports = router;
