class RankController {
	index(req, res) {
		return res.render("rank/index");
	}
}

module.exports = new RankController();
