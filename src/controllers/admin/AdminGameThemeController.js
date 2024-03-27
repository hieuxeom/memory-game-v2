const cardThemeModel = require("../../models/CardThemeModel");

class AdminGameThemeController {
    index(req, res, next) {
        return res.render("admin/game-themes/index", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "Game Themes",
            buttonBackRef: "/admin",
        });
    }

    add(req, res, next) {
        return res.render("admin/game-themes/add", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "New Game Theme",
            buttonBackRef: "/admin/game-themes",
            listScripts: [
                {
                    path: "admin/game.add.js",
                    type: "module"
                },
            ],
        });
    }

    all(req, res, next) {
        return res.render("admin/game-themes/all", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "List Game Themes",
            buttonBackRef: "/admin/game-themes",
            listScripts: [
                {
                    path: "admin/game.list_all.js",
                    type: "module",
                },
            ],
        });
    }

    details(req, res, next) {
        const { gameThemeId } = req.params;

        return res.render("admin/game-themes/detail", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "Game Theme Details",
            buttonBackRef: "/admin/game-themes/all",
            listScripts: [
                {
                    path: "admin/game.detail.js",
                    type: "module",
                },
            ],
            gameThemeId,
        });
    }

    edit(req, res, next) {
        const { themeId } = req.params;

        if (!themeId) {
            return res.redirect("/admin/game-themes/all");
        }

        return res.render("admin/game-themes/edit", {
            containerId: "siteContainer",
            class: "px-8 py-2",
            listScripts: [
                {
                    path: "admin/game.edit.js",
                    type: "module"
                },
            ],
            themeId,
        });
    }
}

module.exports = new AdminGameThemeController();
