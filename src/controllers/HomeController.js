class HomeController {
	constructor() {}

	index(req, res) {
		res.render("index", {
			containerID: "homeContainer",
			listScripts: [
				{
					path: "home/home.index.js",
				},
			],
		});
	}
}

module.exports = new HomeController();
