class RankController {
	index(req, res) {
		return res.render("rank/index", {
			containerId: "siteContainer",
			class: "px-8 py-2",
		});
	}
}

module.exports = new RankController();
