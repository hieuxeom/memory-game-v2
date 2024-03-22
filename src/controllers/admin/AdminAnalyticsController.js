class AdminAnalyticsController {
    index(req, res) {
        res.render("admin/analytics/index", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "Game Analytics",
            buttonBackRef: "/admin"
        });
    }
}

module.exports = new AdminAnalyticsController();
