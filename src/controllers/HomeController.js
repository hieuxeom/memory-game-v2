class HomeController {
	constructor() {}

	index(req, res) {
		res.render("index", {
			containerId: "homeContainer",
			listScripts: [
				{
					path: "home/home.index.js",
				},
				{
					path: "home/home.gamesize.js",
					type: "module",
				},
			],
		});
	}
}

module.exports = new HomeController();
