import { timeConverter } from "./game.timer.js";
var gameScore = document.getElementById("gameScore");
var playerHighestScore = document.getElementById("playerHighestScore");
var notificationBoard = document.getElementById("notification");
export var showNotifyBoard = function (gameTime, isHaveHighestScore) {
    if (isHaveHighestScore === void 0) { isHaveHighestScore = false; }
    notificationBoard.style.display = "block";
    notificationBoard.style.display = "flex";
    var _a = timeConverter(gameTime), minute = _a.minute, second = _a.second;
    gameScore.innerHTML = "".concat(minute, ": ").concat(second);
    if (!isHaveHighestScore) {
        playerHighestScore.style.display = "none";
        playerHighestScore.previousElementSibling && (playerHighestScore.previousElementSibling.style.display = "none");
    }
};
