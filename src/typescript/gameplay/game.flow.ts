import {renderGame} from "./game.generator.js";
import {Timer} from "../utils/Timer.js";
import {IUser} from "../type/user";
import {showNotifyBoard} from "./game.notify.js";

const selectTimeContainer: HTMLElement = document.getElementById("selectGameTime") as HTMLElement;
const buttonStart: HTMLButtonElement = document.getElementById("startGame") as HTMLButtonElement
const handleUnSelectTime = (listTimes: NodeListOf<HTMLButtonElement>) => {
    return listTimes.forEach(button => button.classList.remove("active"))
}

const selectTime = (): number => {
    let time = 0;
    if (selectTimeContainer) {
        const listTimes: NodeListOf<HTMLButtonElement> = document.querySelectorAll("#selectGameTime .button-time")
        listTimes.forEach((button) => {
            button.addEventListener("click", () => {
                localStorage.setItem("gameTime", button.getAttribute("data-button") ?? "");
                handleUnSelectTime(listTimes)
                button.classList.add("active");
                return Number(button.getAttribute("data-button"))
            })
        })
    }

    return time

}

const startGame = async () => {
    const totalTime = localStorage.getItem("gameTime") ? Number(localStorage.getItem("gameTime")) : 0;
    const minuteElement: HTMLElement = document.getElementById("minuteValue") as HTMLElement;
    const secondElement: HTMLElement = document.getElementById("secondValue") as HTMLElement;
    localStorage.setItem("gameTurn", "0");
    const handlerStop = () => {
        let listCards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
        listCards.forEach(card => card.classList.add("disabled"))
        handleGameWin();
    }

    if (totalTime !== 0) {
        console.log(totalTime)
        selectTimeContainer.style.display = "none"
        const timer = new Timer({
            minuteElement,
            secondElement,
            totalTime,
            handlerStop
        })
        timer.start();

        await renderGame()

    }

}

const handleGameWin = () => {
    const _id: string | null = localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")!) as IUser)._id : null;
    console.log(_id);

    const gameThemeId = localStorage.getItem("gameTheme");
    const cardThemeId = localStorage.getItem("cardTheme");
    const gameSize = localStorage.getItem("gameSize");
    const gameTime = Number(localStorage.getItem("gameTime")) ?? 0;
    const gameTurn = Number(localStorage.getItem("gameTurn")) ?? 0;
    const gameScore = Number(document.getElementById("score")?.getAttribute("data-score")) ?? 0;

    const historyData = {
        userId: _id ?? `guestPlayer${Date.now()}`,
        gameThemeId,
        cardThemeId,
        gameTime,
        gameSize,
        gameScore,
        gameTurn,
    };

    fetch("/game/results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(historyData),
    })
        .then((res) => res.json())
        .then((log) => console.log(log));

    if (_id) {
        showNotifyBoard(gameScore);
    } else {
        showNotifyBoard(gameScore, false);

    }
};

const gameFlow = () => {
    selectTime();
    buttonStart.addEventListener("click", () => {
        startGame()
    })
}

gameFlow()