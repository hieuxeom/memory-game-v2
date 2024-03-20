import {timeConverter} from "./game.timer.js";

const gameScore: HTMLElement = document.getElementById("gameScore") as HTMLElement

const notificationBoard: HTMLElement = document.getElementById("notification") as HTMLElement
export const showNotifyBoard = (gameTime: number) => {
    notificationBoard.style.display = "block"
    notificationBoard.style.display = "flex"
    const {minute, second} = timeConverter(gameTime);
    gameScore.innerHTML = `${minute}: ${second}`
}