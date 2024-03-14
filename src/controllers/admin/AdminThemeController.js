const cardThemeModel = require("../../models/CardThemeModel");

class AdminThemeController {
	index(req, res, next) {
		res.render("admin/theme/index", {
			containerId: "siteContainer",
			class: "px-8 py-2",
		});
	}
	add(req, res) {
		res.render("admin/theme/add", {
			containerId: "siteContainer",
			class: "px-8 py-2",
		});
	}
	all(req, res) {
		res.render("admin/theme/all", {
			containerId: "siteContainer",
			class: "px-8 py-2",
		});
	}
	edit(req, res, next) {
		const { themeId } = req.params;

		if (!themeId) {
			return res.redirect("/admin/themes");
		}

		cardThemeModel.findById(themeId).then((themeData) => {
			return res.render("admin/theme/edit", {
				containerId: "siteContainer",
				class: "px-8 py-2",
				listScripts: [
					{
						path: "admin/admin.theme.js",
					},
				],
				themeData,
			});
		});
	}
}

module.exports = new AdminThemeController();
