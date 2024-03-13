var express = require("express");
var router = express.Router();

const adminTheme = require("../controllers/admin/AdminThemeController");

router.get("/", adminTheme.index);

module.exports = router;
