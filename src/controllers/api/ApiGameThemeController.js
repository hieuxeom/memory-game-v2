const gameThemeModel = require("../../models/GameThemeModel");
const { mongooseToObject } = require("../../utils/mongoose");
class ApiGameThemeController {
	getThemeById(req, res, next) {
		const { gameThemeId } = req.params;

		gameThemeModel.findById(gameThemeId).then((theme) => {
			res.json(theme);
		});
	}

	post(req, res, next) {
		let { themeName, themeData } = req.body;

		console.log(themeData);

		const newGameTheme = new gameThemeModel({
			themeName,
			themeData,
		});

		newGameTheme
			.save()
			.then((game) => console.log("New game theme has been added."))
			.catch((err) => {
				console.log("cc");
			});

		return res.json({
			message: "OK",
			data: themeData,
		});
	}
}

module.exports = new ApiGameThemeController();
