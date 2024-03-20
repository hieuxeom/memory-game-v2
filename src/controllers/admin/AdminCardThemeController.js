const cardThemeModel = require("../../models/CardThemeModel");

class AdminCardThemeController {
	index(req, res, next) {
		return res.render("admin/card-themes/index", {
			containerId: "siteContainer",
			class: "px-8 py-2",
		});
	}
	add(req, res) {
		return res.render("admin/card-themes/add", {
			containerId: "siteContainer",
			class: "px-8 py-2",
		});
	}
	all(req, res) {
		return res.render("admin/card-themes/all", {
			containerId: "siteContainer",
			class: "px-8 py-2",
			listScripts: [
				{
					path: "admin/card.list_all.js",
					type: "module",
				},
			],
		});
	}
	edit(req, res, next) {
		const { themeId } = req.params;

		if (!themeId) {
			return res.redirect("/admin/card-themes");
		}

		cardThemeModel.findById(themeId).then((themeData) => {
			return res.render("admin/card-themes/edit", {
				containerId: "siteContainer",
				class: "px-8 py-2",
				listScripts: [
					{
						path: "admin/card.edit.js",
					},
				],
				themeData,
			});
		});
	}
}

module.exports = new AdminCardThemeController();
