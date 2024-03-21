var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b, _c;
import { gameSize } from "../type/general.js";
import { gameLogic } from "./game.logic.js";
import { GameCard } from "../utils/Card.js";
var gameContainer = (_a = document.getElementById("gameContainer")) !== null && _a !== void 0 ? _a : null;
var cardThemeId = (_b = localStorage.getItem("cardTheme")) !== null && _b !== void 0 ? _b : "";
var gameThemeId = (_c = localStorage.getItem("gameTheme")) !== null && _c !== void 0 ? _c : "65f709ad9d376fdf4644c182";
function shuffleAndSlice(array, length) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    array.length = length;
    return __spreadArray(__spreadArray([], array, true), array, true);
}
var gameData = fetch("/api/game-themes/".concat(gameThemeId)).then(function (res) { return res.json(); });
var cardData = fetch("/api/card-themes/".concat(cardThemeId)).then(function (res) { return res.json(); });
Promise.all([gameData, cardData])
    .then(function (_a) {
    var gameDataResponse = _a[0], cardDataResponse = _a[1];
    var gameThemeData = gameDataResponse.themeData;
    return renderCards(gameThemeData, cardDataResponse);
})
    .then(function (listCards) {
    gameLogic(listCards);
});
var renderCards = function (gameData, _a) {
    var cardBack = _a.cardBack, cardFront = _a.cardFront;
    var gameDataShuffled = shuffleAndSlice(gameData, gameSize === "4x4" ? 8 : 10);
    var listOfCards = gameDataShuffled.map(function (_a) {
        var icon = _a.icon, value = _a.value;
        return new GameCard({
            cardFront: cardFront,
            cardBack: cardBack,
            icon: icon,
            value: value
        });
    });
    gameContainer.innerHTML = listOfCards.map(function (card) { return card.render(gameSize === "4x4"); }).join("");
    return document.querySelectorAll(".card");
};
