const historyGameModel = require("../models/HistoryGameModel");
const gameTheme = require("../models/GameThemeModel");
const cardTheme = require("../models/CardThemeModel");
const userModel = require("../models/UserModel");

class GameController {
    index(req, res) {
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

    async handleGameResults(req, res, next) {
        const { userId, gameThemeId, cardThemeId, gameTime, gameSize, gameScore, gameTurn } = req.body;

        try {
            // save game history
            const newGameHistory = new historyGameModel(req.body);
            const saveGameHistory = await newGameHistory.save();

            if (!userId.includes("guestPlayer")) {
                // count up game theme and card themes
                const countUpGameTheme = await gameTheme.findByIdAndUpdate(gameThemeId, { $inc: { played: 1 } }, { new: true });
                const countUpCardTheme = await cardTheme.findByIdAndUpdate(cardThemeId, { $inc: { used: 1 } }, { new: true });

                // get history
                const listUserHistory = await historyGameModel.find({
                    userId: userId,
                });

                // calculate highest score & average score
                const highestScore = listUserHistory.sort((a, b) => b.gameScore - a.gameScore)[0].gameScore;
                const averageScore = listUserHistory.reduce((prev, current) => prev + current.gameScore, 0) / listUserHistory.length;

                const mostPlayedSize = listUserHistory.filter((row) => row.gameSize === "4x4").length >= listUserHistory.filter((row) => row.gameSize === "4x5").length ? "4x4" : "4x5"
                let mostPlayedTime = 60
                const time60 = listUserHistory.filter((row) => row.gameTime === 60 || row.gameTime === 5).length
                const time120 = listUserHistory.filter((row) => row.gameTime === 120).length
                const time300 = listUserHistory.filter((row) => row.gameTime === 300).length

                if (time60 > time120 && time60 > time300) {
                    mostPlayedTime = 60
                } else if (time120 > time300) {
                    mostPlayedTime = 120
                } else {
                    mostPlayedTime = 300
                }

                // Set new average game time & count game played
                const setNewUserAnalytics = await userModel.findByIdAndUpdate(userId, {
                    highestScore,
                    averageScore,
                    mostPlayedSize,
                    mostPlayedTime,
                    gamePlayed: listUserHistory.length
                });
            }

            if (saveGameHistory)
                return res.status(201).json({
                    message: "Handle game results successfully",
                });
            else {
                return res.status(400).json({
                    message: "Error",
                });
            }
        } catch (err) {
            return res.status(400).json({
                message: "Bad request",
                description: err.message,
            });
        }
    }
}

module.exports = new GameController();
