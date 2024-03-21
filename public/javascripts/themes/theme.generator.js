import { currentCardTheme, currentGameTheme } from "../type/general.js";
import { CardThemeCard, GameThemeCard } from "../utils/Card.js";
var cardThemeContainer = document.getElementById("cardThemeContainer");
var gameThemeContainer = document.getElementById("gameThemeContainer");
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
            var mapCardComponent = listCardThemes
                .map(function (theme) {
                return new CardThemeCard({
                    _id: theme._id,
                    cardBack: theme.cardBack,
                    themeName: theme.themeName
                });
            });
            cardThemeContainer.innerHTML = mapCardComponent
                .map(function (card) { return card.render(idSelected === card._id); }).join("");
            return mapCardComponent;
        }).then(function (mapCardComponent) {
            mapCardComponent.forEach(function (Card) {
                Card.setSelectEvent();
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
            var mapCardComponent = listGameThemes.map(function (theme) { return new GameThemeCard({
                themeThumbnail: theme.themeThumbnail,
                themeName: theme.themeName,
                _id: theme._id
            }); });
            gameThemeContainer.innerHTML = mapCardComponent
                .map(function (Card) {
                return Card.render(idSelected === Card._id);
            })
                .join("");
            return mapCardComponent;
        })
            .then(function (mapCardComponent) {
            mapCardComponent.forEach(function (game) {
                game.setSelectEvent();
            });
        });
    });
};
loadingCardTheme();
loadingGameTheme();
