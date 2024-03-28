const historyGameModel = require("../models/HistoryGameModel");
const gameTheme = require("../models/GameThemeModel");
const cardTheme = require("../models/CardThemeModel");
const userModel = require("../models/UserModel");

class GameController {
    index(req, res, next) {
        return res.render("game/index", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            listScripts: [
                {
                    path: "gameplay/game.back.js",
                },
                {
                    path: "gameplay/game.generator.js",
                    type: "module",
                },
                {
                    path: "gameplay/game.timer.js",
                    type: "module",
                },
                {
                    path: "gameplay/game.flow.js",
                    type: "module",
                },
                {
                    path: "gameplay/game.notify.js",
                    type: "module",
                },
            ],
        });
    }
}

module.exports = new GameController();
