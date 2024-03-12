class HomeController {
    constructor() {

    }

    index(req, res) {
        res.render("index")
    }
}

module.exports = new HomeController;