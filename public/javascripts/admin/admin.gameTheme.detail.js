var _a;
var gameThemeId = document.getElementById("gameThemeId").value;
var currentCardThemeId = (_a = localStorage.getItem("cardTheme")) !== null && _a !== void 0 ? _a : "";
var themeNameValue = document.getElementById("themeNameValue");
var themeNameDetail = document.getElementById("themeNameDetail");
var themeTotalItemsDetail = document.getElementById("themeTotalItemsDetail");
var themePlayedDetail = document.getElementById("themePlayedDetail");
var listThemeDataContainer = document.getElementById("listThemeDataContainer");
var fetchCardData = fetch("/api/card-themes/".concat(currentCardThemeId)).then(function (response) { return response.json(); });
var fetchGameData = fetch("/api/game-themes/".concat(gameThemeId, "/")).then(function (response) { return response.json(); });
Promise.all([fetchCardData, fetchGameData]).then(function (_a) {
    var cardData = _a[0], gameData = _a[1];
    var cardFront = cardData.cardFront;
    themeNameValue.innerHTML = gameData.themeName;
    themeNameDetail.innerHTML = gameData.themeName;
    themeTotalItemsDetail.innerHTML = gameData.themeData.length.toString();
    themePlayedDetail.innerHTML = gameData.played.toString();
    listThemeDataContainer.innerHTML = gameData.themeData
        .map(function (gameTheme) {
        return "\n             <div class=\"relative w-full max-h-[180px] bg-white shadow shadow-lg rounded-xl overflow-hidden\">\n \t\t\t\t<img src=\"/images/themepacks/".concat(cardFront, "\" alt=\"\" />\n \t\t\t\t<div class=\"absolute top-0 left-0 w-full h-full flex justify-center items-center\">\n \t\t\t\t\t<i class=\"").concat(gameTheme.icon, " text-4xl\"></i>\n \t\t\t\t</div>\n \t\t\t</div>\n            ");
    })
        .join("");
});
export {};
