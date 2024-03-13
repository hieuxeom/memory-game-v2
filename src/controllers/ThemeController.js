class ThemeController {
	index(req, res) {
		return res.render("theme/index", {
			containerId: "siteContainer",
			class: "px-8 py-2",
			listScripts: [
				{
					path: "themes/theme.index.js",
				},
				{
					path: "themes/theme.generator.js",
				},
			],
		});
	}
}

module.exports = new ThemeController();
