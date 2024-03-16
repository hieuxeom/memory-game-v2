const gameThemeModel = require("../../models/GameThemeModel");

class ApiCardThemeController {
	post(req, res, next) {
		const { themeName, themeData } = req.body;

		// const newCardTheme = new cardThemeModel({
		// 	themeName,
		// 	themeData: [],
		// });

		// newCardTheme
		// 	.save()
		// 	.then((card) => console.log("New card theme has been added."))
		// 	.catch((err) => next(err));

		// return res.redirect("/admin/card-themes/all");
	}
}

module.exports = new ApiCardThemeController();
