class GameController {
	index(req, res) {
		res.render("game/index", {
			containerId: "siteContainer",
			class: "px-8 py-2",
			listScripts: [
				{
					path: "gameplay/game.back.js",
				},
				{
					path: "gameplay/game.generator.js",
					type: "module",
				},
				{
					path: "gameplay/game.timer.js",
					type: "module",
				},
			],
		});
	}
}

module.exports = new GameController();
