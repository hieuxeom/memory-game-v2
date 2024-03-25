const scoreValue = document.getElementById("gameScore");
const playerHighestScore = document.getElementById("playerHighestScore");
const notificationBoard = document.getElementById("notification");
export const showNotifyBoard = (gameScore, isHaveHighestScore = false) => {
    notificationBoard.style.display = "block";
    notificationBoard.style.display = "flex";
    scoreValue.innerHTML = gameScore.toString();
    if (!isHaveHighestScore) {
        playerHighestScore.style.display = "none";
        playerHighestScore.previousElementSibling && (playerHighestScore.previousElementSibling.style.display = "none");
    }
};
