class ShopController {
    index(req, res, next) {
        return res.render("shop/index", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "Vip Shop",
            buttonBackRef: "/",
            listScripts: [
                {
                    path: "/shop/card-themes.tab.js",
                    type: "module"
                },
                {
                    path: "/shop/game-themes.tab.js",
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