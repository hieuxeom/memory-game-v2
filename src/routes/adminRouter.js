var express = require("express");
var router = express.Router();

const adminIndex = require("../controllers/admin/AdminController");
const adminTheme = require("../controllers/admin/AdminThemeController");

router.get("/", adminIndex.index);

router.get("/themes", adminTheme.index);
router.get("/themes/add", adminTheme.add);
router.get("/themes/all", adminTheme.all);
router.get("/themes/edit/", adminTheme.edit);
router.get("/themes/edit/:themeId", adminTheme.edit);

module.exports = router;
