var express = require("express");
var router = express.Router();

const adminIndex = require("../controllers/admin/AdminController");
const adminCardTheme = require("../controllers/admin/AdminCardThemeController");
const adminGameTheme = require("../controllers/admin/AdminGameThemeController");

router.get("/", adminIndex.index);

// Admin Card Themes Router
router.get("/card-themes", adminCardTheme.index);
router.get("/card-themes/add", adminCardTheme.add);
router.get("/card-themes/all", adminCardTheme.all);
router.get("/card-themes/edit/", adminCardTheme.index);
router.get("/card-themes/edit/:themeId", adminCardTheme.edit);

// Admin Game Themes Router
router.get("/game-themes", adminGameTheme.index);
router.get("/game-themes/all", adminGameTheme.all);
router.get("/game-themes/add", adminGameTheme.add);
router.get("/game-themes/edit/", adminGameTheme.index);
router.get("/game-themes/edit/:themeId", adminGameTheme.edit);
router.get("/game-themes/:gameThemeId", adminGameTheme.details);

module.exports = router;
