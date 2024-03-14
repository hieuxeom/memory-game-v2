"use strict";
var playGame = document.getElementById("playGame");
var viewRank = document.getElementById("viewRank");
var viewTheme = document.getElementById("viewTheme");
playGame === null || playGame === void 0 ? void 0 : playGame.addEventListener("click", function () {
    window.location.href = "/game";
});
viewRank === null || viewRank === void 0 ? void 0 : viewRank.addEventListener("click", function () {
    window.location.href = "/rank";
});
viewTheme === null || viewTheme === void 0 ? void 0 : viewTheme.addEventListener("click", function () {
    window.location.href = "/theme";
});
