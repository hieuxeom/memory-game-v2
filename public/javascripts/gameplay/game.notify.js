var scoreValue = document.getElementById("gameScore");
var playerHighestScore = document.getElementById("playerHighestScore");
var notificationBoard = document.getElementById("notification");
export var showNotifyBoard = function (gameScore, isHaveHighestScore) {
    if (isHaveHighestScore === void 0) { isHaveHighestScore = false; }
    notificationBoard.style.display = "block";
    notificationBoard.style.display = "flex";
    scoreValue.innerHTML = gameScore.toString();
    if (!isHaveHighestScore) {
        playerHighestScore.style.display = "none";
        playerHighestScore.previousElementSibling && (playerHighestScore.previousElementSibling.style.display = "none");
    }
};
