var express = require("express");
var router = express.Router();

const authController = require("../controllers/AuthController");

router.get("/", authController.index);
router.get("/password", authController.loginWithPassword)
router.get("/register", authController.register)

module.exports = router;
