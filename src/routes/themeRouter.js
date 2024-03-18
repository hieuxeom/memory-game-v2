var express = require("express");
var router = express.Router();

const themeController = require("../controllers/ThemeController");

router.get("/", themeController.index);

module.exports = router;
