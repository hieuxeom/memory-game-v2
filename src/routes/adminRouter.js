var express = require("express");
var router = express.Router();

const adminIndex = require("../controllers/admin/AdminController");
const adminCardTheme = require("../controllers/admin/AdminCardThemeController");

router.get("/", adminIndex.index);

router.get("/themes", adminCardTheme.index);
router.get("/themes/add", adminCardTheme.add);
router.get("/themes/all", adminCardTheme.all);
router.get("/themes/edit/", adminCardTheme.edit);
router.get("/themes/edit/:themeId", adminCardTheme.edit);

module.exports = router;
