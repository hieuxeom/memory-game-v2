import {timeConverter} from "../utils/Timer";

const scoreValue: HTMLElement = document.getElementById("gameScore") as HTMLElement
const playerHighestScore: HTMLElement = document.getElementById("playerHighestScore") as HTMLElement
const totalCoinsValue: HTMLElement = document.getElementById("totalCoins") as HTMLElement;
const scoreCoinsValue: HTMLElement = document.getElementById("scoreCoins") as HTMLElement;
const gameSizeBonusValue: HTMLElement = document.getElementById("gameSizeBonus") as HTMLElement;
const gameTimeBonusValue: HTMLElement = document.getElementById("gameTimeBonus") as HTMLElement;

const notificationBoard: HTMLElement = document.getElementById("notification") as HTMLElement
export const showNotifyBoard = (gameScore: number, totalCoins?: number, scoreCoin?: number, gameSizeBonus?: number, gameTimeBonus?: number, isHaveHighestScore = false) => {
    notificationBoard.style.display = "block"
    notificationBoard.style.display = "flex"
    scoreValue.innerHTML = gameScore.toString();
    totalCoinsValue.innerHTML = `${totalCoins}`
    scoreCoinsValue.innerHTML = `${scoreCoin}`
    gameSizeBonusValue.innerHTML = `${gameSizeBonus}`
    gameTimeBonusValue.innerHTML = `${gameTimeBonus}`

    if (!isHaveHighestScore) {
        playerHighestScore.style.display = "none"
        playerHighestScore.previousElementSibling && ((playerHighestScore.previousElementSibling as HTMLElement).style.display = "none");
    }
}