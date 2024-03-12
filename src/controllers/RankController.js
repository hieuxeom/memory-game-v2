class RankController {
	index(req, res) {
		return res.render("rank/index", {
			containerID: "rankContainer",
			class: "px-8 py-2",
		});
	}
}

module.exports = new RankController();
