const cardThemeModel = require("../../models/CardThemeModel");

class ApiCardThemeController {
	async get(req, res) {
		return res.json(await cardThemeModel.find({}));
	}

	async getThemeById(req, res, next) {
		const { themeId } = req.params;
		return res.json(await cardThemeModel.findById(themeId));
	}

	async post(req, res, next) {
		const { themeName } = req.body;
		let { themeFront, themeBack } = req.files;

		themeFront = themeFront[0];
		themeBack = themeBack[0];

		const newCardTheme = new cardThemeModel({
			themeName,
			cardFront: themeFront.filename,
			cardBack: themeBack.filename,
		});

		const createNewCardTheme = await newCardTheme.save();

		if (createNewCardTheme) {
			return res.redirect("/admin/card-themes/all");
		} else {
			return res.status(400).json({
				message: "Bad request",
				description: err.message,
			});
		}
	}

	async put(req, res, next) {
		try {
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

			const updateCardTheme = await cardThemeModel.findByIdAndUpdate(themeId, updateData);

			if (updateCardTheme) {
				return res.redirect(`/admin/card-themes/all`);
			} else {
				return res.status(400).json({
					message: "Bad request",
					description: "Have some problems",
				});
			}
		} catch (err) {
			return res.status(400).json({
				message: "Bad request",
				description: err.message,
			});
		}
	}

	async delete(req, res, next) {
		try {
			const { themeId } = req.params;

			console.log(themeId);
			const deleteCardTheme = await cardThemeModel.findByIdAndDelete(themeId);
			if (deleteCardTheme) {
				return res.redirect(`/admin/card-themes/all`);
			} else {
				return res.status(400).json({
					message: "Bad request",
					description: "Have some problems",
				});
			}
		} catch (err) {
			return res.status(500).json({
				message: "Bad request",
				description: err.message,
			});
		}
	}
}

module.exports = new ApiCardThemeController();
