const scoreValue = document.getElementById("gameScore");
const playerHighestScore = document.getElementById("playerHighestScore");
const totalCoinsValue = document.getElementById("totalCoins");
const scoreCoinsValue = document.getElementById("scoreCoins");
const gameSizeBonusValue = document.getElementById("gameSizeBonus");
const gameTimeBonusValue = document.getElementById("gameTimeBonus");
const notificationBoard = document.getElementById("notification");
export const showNotifyBoard = (gameScore, totalCoins, scoreCoin, gameSizeBonus, gameTimeBonus, isHaveHighestScore = false) => {
    notificationBoard.style.display = "block";
    notificationBoard.style.display = "flex";
    scoreValue.innerHTML = gameScore.toString();
    totalCoinsValue.innerHTML = `${totalCoins}`;
    scoreCoinsValue.innerHTML = `${scoreCoin}`;
    gameSizeBonusValue.innerHTML = `${gameSizeBonus}`;
    gameTimeBonusValue.innerHTML = `${gameTimeBonus}`;
    if (!isHaveHighestScore) {
        playerHighestScore.style.display = "none";
        playerHighestScore.previousElementSibling && (playerHighestScore.previousElementSibling.style.display = "none");
    }
};
