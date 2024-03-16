const cardThemeModel = require("../../models/CardThemeModel");

class ApiCardThemeController {
	get(req, res) {
		cardThemeModel.find({}).then((cardTheme) => {
			res.json(cardTheme);
		});
	}

	getThemeById(req, res, next) {
		const { themeId } = req.params;

		cardThemeModel.findById(themeId).then((theme) => {
			res.json(theme);
		});
	}

	post(req, res, next) {
		const { themeName } = req.body;
		let { themeFront, themeBack } = req.files;

		themeFront = themeFront[0];
		themeBack = themeBack[0];

		const newCardTheme = new cardThemeModel({
			themeName,
			cardFront: themeFront.filename,
			cardBack: themeBack.filename,
		});

		newCardTheme
			.save()
			.then((card) => console.log("New card theme has been added."))
			.catch((err) => next(err));

		return res.redirect("/admin/card-themes/all");
	}

	put(req, res, next) {
		const { themeId, themeName } = req.body;

		let { themeFront, themeBack } = req.files;

		let updateData = {
			themeName,
		};
		if (themeFront) {
			updateData = {
				...updateData,
				cardFront: themeFront[0].filename,
			};
		}
		if (themeBack) {
			updateData = {
				...updateData,
				cardBack: themeBack[0].filename,
			};
		}

		cardThemeModel
			.findByIdAndUpdate(themeId, updateData)
			.then(() => {
				res.status(301).redirect(`/admin/card-themes/all`);
			})
			.catch((err) => {
				console.log(err);
				next(err);
			});
	}

	delete(req, res, next) {
		const { themeId } = req.params;

		console.log(themeId);
		cardThemeModel
			.findByIdAndDelete(themeId)
			.then(() => {
				res.status(301).redirect(`/admin/card-themes/all`);
			})
			.catch((err) => {
				console.log(err);
				next(err);
			});
	}
}

module.exports = new ApiCardThemeController();
