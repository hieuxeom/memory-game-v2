const gameThemeModel = require("../../models/GameThemeModel");
const { mongooseToObject } = require("../../utils/mongoose");
class ApiGameThemeController {
	async getAllGameThemes(req, res, next) {
		return res.json(await gameThemeModel.find({}));
	}

	async getThemeById(req, res, next) {
		const { gameThemeId } = req.params;

		return res.json(await gameThemeModel.findById(gameThemeId));
	}

	async post(req, res, next) {
		try {
			let { themeName, themeData } = req.body;
			if (!themeData) {
				return res.status(400).json({
					message: "Theme data is empty",
				});
			}

			const newGameTheme = new gameThemeModel({
				themeName,
				themeData,
			});

			await newGameTheme.save();

			return res.json({
				message: "Created new game theme successfully",
			});
		} catch (err) {
			return res.status(400).json({
				message: "Bad request",
				description: err.message,
			});
		}
	}
}

module.exports = new ApiGameThemeController();
