"use strict";
const playGame = document.getElementById("playGame");
const viewRank = document.getElementById("viewRank");
const viewTheme = document.getElementById("viewTheme");
playGame === null || playGame === void 0 ? void 0 : playGame.addEventListener("click", () => {
    window.location.href = "/game";
});
viewRank === null || viewRank === void 0 ? void 0 : viewRank.addEventListener("click", () => {
    window.location.href = "/rank";
});
viewTheme === null || viewTheme === void 0 ? void 0 : viewTheme.addEventListener("click", () => {
    window.location.href = "/theme";
});
