var _a, _b;
import { parseGameData } from "./game.utils.js";
var gameThemeId = (_b = (_a = document.getElementById("themeId")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
var gameThemeName = document.getElementById("themeName");
var gameThemeData = document.getElementById("themeData");
var gameThumbnail = document.getElementById("themeThumbnail");
var listThemeTypes = document.getElementsByName("themeDataType");
var submitEditButton = document.getElementById("submitButton");
var onLoad = function () {
    fetch("/api/game-themes/".concat(gameThemeId)).then(function (res) { return res.json(); }).then(function (themeData) {
        gameThemeName.value = themeData.themeName;
        gameThemeData.value = themeData.rawData;
    });
};
submitEditButton.addEventListener("click", function (e) {
    e.preventDefault();
    var themeDataType = null;
    listThemeTypes.forEach(function (e) {
        if (e.checked) {
            themeDataType = e.value;
            return;
        }
    });
    var themeDataParsed = parseGameData(gameThemeData.value.split("\n"));
    var formData = new FormData();
    formData.append("themeId", gameThemeId);
    formData.append("themeName", gameThemeName.value);
    formData.append("themeThumbnail", gameThumbnail.files ? gameThumbnail.files[0] : "");
    formData.append("themeDataParsed", JSON.stringify(themeDataParsed));
    formData.append("rawData", gameThemeData.value);
    formData.append("themeDataType", themeDataType !== null && themeDataType !== void 0 ? themeDataType : "icon");
    fetch("/api/game-themes/", {
        method: "PUT",
        body: formData
    }).then(function (res) {
        if (res.url) {
            return window.location.href = res.url;
        }
    }).catch(function (err) {
        console.log(err);
    });
});
onLoad();
