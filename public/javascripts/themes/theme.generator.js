import { currentCardTheme, currentGameTheme } from "../type/general.js";
var cardThemeContainer = document.getElementById("cardThemeContainer");
var gameThemeContainer = document.getElementById("gameThemeContainer");
var handleUnSelectedCard = function (listCardThemes) {
    listCardThemes.forEach(function (card) {
        card.classList.remove("selected");
    });
};
var handleUnSelectedGame = function (listGameThemes) {
    listGameThemes.forEach(function (game) {
        game.classList.remove("selected");
    });
};
var loadingCardTheme = function () {
    return new Promise(function (resolve, reject) {
        fetch("/api/card-themes")
            .then(function (res) { return res.json(); })
            .then(function (listCardThemes) {
            var idSelected = currentCardTheme;
            if (!currentCardTheme) {
                idSelected = listCardThemes[0]._id;
                localStorage.setItem("cardTheme", idSelected);
            }
            cardThemeContainer.innerHTML = listCardThemes
                .map(function (card) {
                return "<div data-value=".concat(card._id, "\n\t\t\t\t\t\t\t\t\tclass=\"theme-card ").concat(card._id === idSelected ? "selected" : "", " w-full max-h-[145px] bg-white shadow shadow-lg rounded-xl overflow-hidden\"\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t<img class=\"h-full w-full\" src=\"/images/themepacks/").concat(card.cardBack, "\" alt=\"").concat(card.themeName, " Card Theme\"/>\n                                </div>");
            }).join("");
            return document.querySelectorAll(".theme-card");
        }).then(function (listCardThemes) {
            listCardThemes.forEach(function (card) {
                card.addEventListener("click", function () {
                    var _a;
                    handleUnSelectedCard(listCardThemes);
                    card.classList.add("selected");
                    localStorage.setItem("cardTheme", (_a = card.getAttribute("data-value")) !== null && _a !== void 0 ? _a : "");
                });
            });
        });
    });
};
var loadingGameTheme = function () {
    return new Promise(function (resolve, reject) {
        fetch("/api/game-themes")
            .then(function (res) { return res.json(); })
            .then(function (listGameThemes) {
            var idSelected = currentGameTheme;
            if (!currentCardTheme) {
                idSelected = listGameThemes[0]._id;
                localStorage.setItem("gameTheme", idSelected);
            }
            gameThemeContainer.innerHTML = listGameThemes
                .map(function (game) {
                return "<div class=\"flex flex-col justify-center items-center gap-2\">\n                                    <div data-value=".concat(game._id, " \n                                        class=\"theme-game ").concat(game._id === idSelected ? "selected" : "", "\n                                        w-full max-h-[145px] bg-white shadow shadow-lg  overflow-hidden\"\n                                        >\n                                        <img src=\"/images/game_thumbnails/").concat(game.themeThumbnail, "\" alt=\"").concat(game.themeName, " Card Theme\"/>\n                                    </div>\n\t\t\t\t\t\t\t\t    <p class=\"text-xl text-secondary\">").concat(game.themeName, "</p>\n\t\t\t\t\t\t\t\t</div>");
            })
                .join("");
            return document.querySelectorAll(".theme-game");
        })
            .then(function (listGameThemes) {
            listGameThemes.forEach(function (game) {
                game.addEventListener("click", function () {
                    var _a;
                    handleUnSelectedGame(listGameThemes);
                    game.classList.add("selected");
                    localStorage.setItem("gameTheme", (_a = game.getAttribute("data-value")) !== null && _a !== void 0 ? _a : "");
                });
            });
        });
    });
};
loadingCardTheme();
loadingGameTheme();
