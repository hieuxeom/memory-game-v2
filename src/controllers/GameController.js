class GameController {
	index(req, res) {
		res.render("game/index", {
			containerID: "gameContainer",
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
				},
			],
		});
	}
}
// <script src="/javascripts/gameplay/game.back.js"></script>
// <script src="/javascripts/gameplay/game.generator.js" type="module"></script>
// <script src="/javascripts/gameplay/game.timer.js"></script>

module.exports = new GameController();
