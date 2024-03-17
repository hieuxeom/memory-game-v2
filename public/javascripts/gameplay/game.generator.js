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
var gameContainer = (_a = document.getElementById("gameContainer")) !== null && _a !== void 0 ? _a : null;
var themeId = (_b = localStorage.getItem("cardTheme")) !== null && _b !== void 0 ? _b : "";
function shuffleAndSlice(array, length) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    array.length = length;
    return __spreadArray(__spreadArray([], array, true), array, true);
}
var gameThemeId = (_c = localStorage.getItem("gameThemeId")) !== null && _c !== void 0 ? _c : "65f709ad9d376fdf4644c182";
var gameData = fetch("/api/game-themes/".concat(gameThemeId)).then(function (res) { return res.json(); });
var cardData = fetch("/api/card-themes/".concat(themeId)).then(function (res) { return res.json(); });
Promise.all([gameData, cardData])
    .then(function (_a) {
    var gameDataResponse = _a[0], cardDataResponse = _a[1];
    var gameThemeData = gameDataResponse.themeData;
    return renderCards(gameThemeData, cardDataResponse);
})
    .then(function (listCards) {
    gameLogic(listCards);
});
var cardComps = function (cardBack, cardFront, icon, value) {
    return "<div data-value=\"".concat(value, "\" class=\"card relative shadow-lg h-[").concat(gameSize === "4x4" ? "170" : "135", "px] rounded-lg overflow-hidden\" data-value=\"").concat(value, "\">\n    <div class=\"card-back h-full\">\n        <img src=\"/images/themepacks/").concat(cardBack, "\" class=\"w-full h-full\"/>\n    </div>\n    <div class=\"card-front w-full h-full\">\n\t\t<div>\n\t\t\t<img src=\"/images/themepacks/").concat(cardFront, "\" class=\"w-full h-full\"/>\n\t\t</div>\n\t\t<div class=\"absolute top-0 left-0 bg-white w-auto h-full shadow-lg\"></div>\n        <div class=\"absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]\">\n            <i class=\"").concat(icon, " text-4xl\"></i>\n        </div>\n    </div>\n</div>");
};
var renderCards = function (gameData, _a) {
    var cardBack = _a.cardBack, cardFront = _a.cardFront;
    var gameDataShuffled = shuffleAndSlice(gameData, gameSize === "4x4" ? 8 : 10);
    gameContainer.innerHTML = gameDataShuffled.map(function (_a) {
        var icon = _a.icon, value = _a.value;
        return cardComps(cardBack, cardFront, icon, value);
    }).join("");
    return document.querySelectorAll(".card");
};
