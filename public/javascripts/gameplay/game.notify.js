import { timeConverter } from "./game.timer.js";
var gameScore = document.getElementById("gameScore");
var notificationBoard = document.getElementById("notification");
export var showNotifyBoard = function (gameTime) {
    notificationBoard.style.display = "block";
    notificationBoard.style.display = "flex";
    var _a = timeConverter(gameTime), minute = _a.minute, second = _a.second;
    gameScore.innerHTML = "".concat(minute, ": ").concat(second);
};
