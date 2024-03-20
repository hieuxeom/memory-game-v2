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
					path: "gameplay/game.notify.js",
					type: "module",
				},
			],
		});
	}

	async handleGameResults(req, res, next) {
		const { userId, gameThemeId, cardThemeId } = req.body;

		try {
			// save game history
			const newGameHistory = new historyGameModel(req.body);
			const saveGameHistory = await newGameHistory.save();

			// count up game theme and card themes
			const countUpGameTheme = await gameTheme.findByIdAndUpdate(gameThemeId, { $inc: { played: 1 } }, { new: true });
			const countUpCardTheme = await cardTheme.findByIdAndUpdate(cardThemeId, { $inc: { used: 1 } }, { new: true });

			// Calculate average game time
			const listUserHistory = await historyGameModel.find({
				userId: userId,
			});
			const totalGameTime = listUserHistory.reduce((prev, next) => prev + next.gameTime, 0);
			const averageGameTime = totalGameTime / listUserHistory.length;

			// Set new average game time & count game played
			const setNewUserAnalytics = await userModel.findByIdAndUpdate(userId, {
				averageTime: averageGameTime,
				gamePlayed: listUserHistory.length,
			});

			if (saveGameHistory && countUpGameTheme && countUpCardTheme && setNewUserAnalytics)
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
