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

router.get("/themes/:themeId", apiCardTheme.getThemeById);
router.get("/themes", apiCardTheme.get);
const multiUpload = upload.fields([
	{ name: "themeFront", maxCount: 1 },
	{ name: "themeBack", maxCount: 1 },
]);

router.post("/themes", multiUpload, apiCardTheme.post);
router.put("/themes", multiUpload, apiCardTheme.put);

module.exports = router;
