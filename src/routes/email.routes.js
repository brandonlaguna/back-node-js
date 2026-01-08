const { Router } = require("express");
const emailController = require("../controllers/email.controller");

const router = Router();

router.post("/getInTouch", emailController.getInTouch);
router.post("/subscribeNewsLetter", emailController.subscribeNewsLetter);

module.exports = router;
