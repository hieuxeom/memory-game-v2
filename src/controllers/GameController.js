class GameController {
    index(req, res) {
        res.render("game/index");
    }
}

module.exports = new GameController();