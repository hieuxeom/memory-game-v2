class AdminController {
	index(req, res) {

		res.render("admin/index", {
			containerId: "siteContainer",
			class: "px-8 py-2",
			title: "Admin Board"
		});
	}
}

module.exports = new AdminController();
