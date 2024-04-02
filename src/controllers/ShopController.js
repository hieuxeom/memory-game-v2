class ShopController {
    index(req, res, next) {
        const { tab } = req.query;

        let scriptPath = "";
        let view = ""
        switch (tab) {
            case "card-themes":
                scriptPath = "/shop/card-themes.tab.js"
                view = "card"
                break;
            case "game-themes":
                scriptPath = "/shop/game-themes.tab.js"
                view = "game"
                break;
            default:
                scriptPath = "/shop/card-themes.tab.js"
                view = "card"
                break;
        }

        return res.render(`shop/${view}`, {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "Vip Shop",
            buttonBackRef: "/",
            listScripts: [
                {
                    path: scriptPath,
                    type: "module"
                },
                {
                    path: "/shop/shop.index.js",
                    type: "module"
                }
            ]
        })
    }
}

module.exports = new ShopController();