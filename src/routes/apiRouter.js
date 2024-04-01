const express = require("express");
const router = express.Router();
const multer = require("multer");

const cardThemeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/themepacks");
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, Date.now() + "-test" + "." + ext);
    },
});

const gameThemeStorage = multer.diskStorage({
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
const apiGameHistory = require("../controllers/api/ApiGameHistoryController");
const apiChart = require("../controllers/api/ApiChartController");
const apiRank = require("../controllers/api/ApiRankController");
const apiGameResult = require("../controllers/api/ApiGameResultController");
const apiShop = require("../controllers/api/ApiShopController");
const multiCardUpload = cardThemeUpload.fields([
    { name: "cardFront", maxCount: 1 },
    { name: "cardBack", maxCount: 1 },
]);

const gameThumbnailUpload = gameThemeUpload.single("themeThumbnail");

// Card Themes Router
router.get("/card-themes/vip", apiCardTheme.getThemesVip);
router.get("/card-themes/:themeId", apiCardTheme.getThemeById);
router.get("/card-themes", apiCardTheme.getWithFilter);
router.post("/card-themes", multiCardUpload, apiCardTheme.post);
router.put("/card-themes", multiCardUpload, apiCardTheme.put);
router.delete("/card-themes/:themeId", apiCardTheme.delete);

// Game Themes Router
router.get("/game-themes/vip", apiGameTheme.getThemesVip);
router.get("/game-themes/:gameThemeId", apiGameTheme.getThemeById);
router.get("/game-themes", apiGameTheme.getAllGameThemes);
router.post("/game-themes", gameThumbnailUpload, apiGameTheme.post);
router.put("/game-themes", gameThumbnailUpload, apiGameTheme.put);
router.delete("/game-themes/:themeId", apiGameTheme.delete);

//Auth Router
router.post("/googleSignIn", apiAuth.loginWithGoogle);
router.post("/auth/register", apiAuth.credentialsRegister)
router.post("/auth/login", apiAuth.loginWithPassword)
router.post("/auth/change-pwd", apiAuth.changePassword)

// User API router
router.get("/users", apiUser.getAllUsers);
router.get("/users/:userId", apiUser.getUserById);

// Game Result API routers
router.post("/game-results", apiGameResult.handleResult)

//  Game History router
router.get("/game-history", apiGameHistory.get);
router.get("/game-history/:userId", apiGameHistory.getPlayerGameHistory);

// Charts History
router.get("/charts/game-themes", apiChart.handleGameTheme);
router.get("/charts/card-themes", apiChart.handleCardTheme);
router.get("/charts/game-sizes", apiChart.handleGameSize);
router.get("/charts/game-times", apiChart.handleGameTime);

// Rank router
router.get("/ranks", apiRank.get)
router.get("/ranks", apiRank.get)

// Shop router
router.post("/shop", apiShop.buy)

module.exports = router;
