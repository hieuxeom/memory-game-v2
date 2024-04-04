class HomeController {

	index(req, res, next) {
		return res.render("index", {
			containerId: "homeContainer",
			listScripts: [
				{
					path: "home/home.index.js",
					type: "module",
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
