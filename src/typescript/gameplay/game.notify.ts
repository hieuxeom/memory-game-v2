import {timeConverter} from "./game.timer.js";

const gameScore: HTMLElement = document.getElementById("gameScore") as HTMLElement
const playerHighestScore: HTMLElement = document.getElementById("playerHighestScore") as HTMLElement

const notificationBoard: HTMLElement = document.getElementById("notification") as HTMLElement
export const showNotifyBoard = (gameTime: number, isHaveHighestScore = false) => {
    notificationBoard.style.display = "block"
    notificationBoard.style.display = "flex"
    const {minute, second} = timeConverter(gameTime);
    gameScore.innerHTML = `${minute}: ${second}`

    if (!isHaveHighestScore) {
        playerHighestScore.style.display = "none"
        playerHighestScore.previousElementSibling && ((playerHighestScore.previousElementSibling as HTMLElement).style.display = "none");
    }
}