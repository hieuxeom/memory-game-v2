var express = require("express");
var router = express.Router();
const multer = require("multer");

var cardThemeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/themepacks");
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, Date.now() + "-test" + "." + ext);
    },
});

var gameThemeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/game_thumbnails");
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, Date.now() + "-test" + "." + ext);
    },
});

const cardThemeUpload = multer({ storage: cardThemeStorage });
const gameThemeUpload = multer({ storage: gameThemeStorage });

const apiAuth = require("../controllers/api/ApiAuthController");
const apiCardTheme = require("../controllers/api/ApiCardThemeController");
const apiGameTheme = require("../controllers/api/ApiGameThemeController");
const apiUser = require("../controllers/api/ApiUserController");

const multiCardUpload = cardThemeUpload.fields([
    { name: "themeFront", maxCount: 1 },
    { name: "themeBack", maxCount: 1 },
]);

const gameThumbnailUpload = gameThemeUpload.single("themeThumbnail");

// Card Themes Router
router.get("/card-themes/:themeId", apiCardTheme.getThemeById);
router.get("/card-themes", apiCardTheme.get);
router.post("/card-themes", multiCardUpload, apiCardTheme.post);
router.put("/card-themes", multiCardUpload, apiCardTheme.put);
router.delete("/card-themes/:themeId", apiCardTheme.delete);

// Game Themes Router
router.get("/game-themes/:gameThemeId", apiGameTheme.getThemeById);
router.get("/game-themes", apiGameTheme.getAllGameThemes);
router.post("/game-themes", gameThumbnailUpload, apiGameTheme.post);
router.put("/game-themes", gameThumbnailUpload, apiGameTheme.put);
router.delete("/game-themes/:themeId", apiGameTheme.delete);

//Auth Router
router.post("/googleSignIn", apiAuth.loginWithGoogle);

// User API router
router.get("/users", apiUser.getAllUsers);
router.get("/users/:userId", apiUser.getUserById);
module.exports = router;
