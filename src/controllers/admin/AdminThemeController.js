class AdminThemeController {
	index(req, res) {
		res.render("admin/theme/add", {
			containerId: "siteContainer",
			class: "px-8 py-2",
		});
	}
}

module.exports = new AdminThemeController();
