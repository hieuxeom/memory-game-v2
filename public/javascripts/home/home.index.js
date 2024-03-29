"use strict";
const playGame = document.getElementById("playGame");
const viewRank = document.getElementById("viewRank");
const viewTheme = document.getElementById("viewTheme");
const viewUser = document.getElementById("viewUser");
playGame?.addEventListener("click", () => {
    window.location.href = "/game";
});
viewRank?.addEventListener("click", () => {
    window.location.href = "/rank";
});
viewTheme?.addEventListener("click", () => {
    window.location.href = "/themes?tab=card-themes";
});
viewUser?.addEventListener("click", () => {
    window.location.href = "/user";
});
