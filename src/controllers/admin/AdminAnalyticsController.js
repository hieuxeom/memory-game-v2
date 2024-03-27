class AdminAnalyticsController {
    index(req, res) {
        return res.render("admin/analytics/index", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "Game Analytics",
            buttonBackRef: "/admin",
            listScripts: [
                {
                    path: "admin/analytics.index.js",
                    type: "module"
                }
            ]
        });
    }
}

module.exports = new AdminAnalyticsController();
