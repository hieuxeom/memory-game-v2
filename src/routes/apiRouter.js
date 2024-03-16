var express = require("express");
var router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/images/themepacks");
	},
	filename: function (req, file, cb) {
		let ext = file.mimetype.split("/")[1];
		cb(null, Date.now() + "-test" + "." + ext);
	},
});

const upload = multer({ storage: storage });

const apiCardTheme = require("../controllers/api/ApiCardThemeController");
const apiGameTheme = require("../controllers/api/ApiGameThemeController");

const multiUpload = upload.fields([
	{ name: "themeFront", maxCount: 1 },
	{ name: "themeBack", maxCount: 1 },
]);

// Card Themes Router
router.get("/card-themes/:themeId", apiCardTheme.getThemeById);
router.get("/card-themes", apiCardTheme.get);
router.post("/card-themes", multiUpload, apiCardTheme.post);
router.put("/card-themes", multiUpload, apiCardTheme.put);
router.delete("/card-themes/:themeId", apiCardTheme.delete);

// Game Themes Router
// router.get("/game-themes");
router.post("/game-themes", apiGameTheme.post);

module.exports = router;
