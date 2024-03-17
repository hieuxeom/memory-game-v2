var express = require("express");
var router = express.Router();

const authController = require("../controllers/AuthController");

router.get("/", authController.index);

module.exports = router;
