class RankController {
    index(req, res) {
        return res.render("rank/index", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "Ranking Board",
            buttonBackRef: "/",
            listScripts: [
                {
                    path: "/ranks/rank.button-tab.js",
                    type: "module",
                },
                {
                    path: "/ranks/rank.fetch-data.js",
                    type: "module",
                }
            ]
        });
    }
}

module.exports = new RankController();
