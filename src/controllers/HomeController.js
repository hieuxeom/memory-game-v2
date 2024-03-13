class HomeController {
	constructor() {}

	index(req, res) {
		res.render("index", {
			containerId: "homeContainer",
			listScripts: [
				{
					path: "home/home.index.js",
				},
			],
		});
	}
}

module.exports = new HomeController();
