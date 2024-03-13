var express = require("express");
var router = express.Router();

const themeRouter = require("../controllers/ThemeController");

router.get("/", themeRouter.index);

module.exports = router;
