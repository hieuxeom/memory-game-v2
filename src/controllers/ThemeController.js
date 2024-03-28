class ThemeController {
    index(req, res, next) {
        const { tab } = req.query;
        let listScripts = [
            {
                path: "themes/themes.index.js",
                type: "module"
            }
        ]
        switch (tab) {
            case "card-themes":
                listScripts.push({
                    path: "themes/card-themes.tab.js",
                    type: "module",
                })
                break;
            case "game-themes":
                listScripts.push({
                    path: "themes/game-themes.tab.js",
                    type: "module",
                })
                break;
            default:
                listScripts.push({
                    path: "themes/card-themes.tab.js",
                    type: "module",
                })
                break;
        }

        return res.render("theme/index", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            listScripts
        });
    }
}

module.exports = new ThemeController();
