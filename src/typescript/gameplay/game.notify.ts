import {timeConverter} from "../utils/Timer";

const scoreValue: HTMLElement = document.getElementById("gameScore") as HTMLElement
const playerHighestScore: HTMLElement = document.getElementById("playerHighestScore") as HTMLElement

const notificationBoard: HTMLElement = document.getElementById("notification") as HTMLElement
export const showNotifyBoard = (gameScore: number, isHaveHighestScore = false) => {
    notificationBoard.style.display = "block"
    notificationBoard.style.display = "flex"
    scoreValue.innerHTML = gameScore.toString();

    if (!isHaveHighestScore) {
        playerHighestScore.style.display = "none"
        playerHighestScore.previousElementSibling && ((playerHighestScore.previousElementSibling as HTMLElement).style.display = "none");
    }
}