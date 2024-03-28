import { renderGame } from "./game.generator.js";
import { Timer } from "../utils/Timer.js";
import { showNotifyBoard } from "./game.notify.js";
const selectTimeContainer = document.getElementById("selectGameTime");
const buttonStart = document.getElementById("startGame");
const handleUnSelectTime = (listTimes) => {
    return listTimes.forEach(button => button.classList.remove("active"));
};
const selectTime = () => {
    let time = 0;
    if (selectTimeContainer) {
        const listTimes = document.querySelectorAll("#selectGameTime .button-time");
        listTimes.forEach((button) => {
            button.addEventListener("click", () => {
                localStorage.setItem("gameTime", button.getAttribute("data-button") ?? "");
                handleUnSelectTime(listTimes);
                button.classList.add("active");
                return Number(button.getAttribute("data-button"));
            });
        });
    }
    return time;
};
const startGame = async () => {
    const totalTime = localStorage.getItem("gameTime") ? Number(localStorage.getItem("gameTime")) : 0;
    const minuteElement = document.getElementById("minuteValue");
    const secondElement = document.getElementById("secondValue");
    localStorage.setItem("gameTurn", "0");
    const handlerStop = () => {
        let listCards = document.querySelectorAll(".card");
        listCards.forEach(card => card.classList.add("disabled"));
        handleGameWin();
    };
    if (totalTime !== 0) {
        console.log(totalTime);
        selectTimeContainer.style.display = "none";
        const timer = new Timer({
            minuteElement,
            secondElement,
            totalTime,
            handlerStop
        });
        timer.start();
        await renderGame();
    }
};
const handleGameWin = () => {
    let _id = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData"))._id : null;
    console.log(_id);
    if (!_id) {
        if (localStorage.getItem("guestId")) {
            _id = localStorage.getItem("guestId");
        }
        else {
            _id = `guestPlayer${Date.now()}`;
            localStorage.setItem("guestId", _id);
        }
    }
    const gameThemeId = localStorage.getItem("gameTheme");
    const cardThemeId = localStorage.getItem("cardTheme");
    const gameSize = localStorage.getItem("gameSize");
    const gameTime = Number(localStorage.getItem("gameTime")) ?? 0;
    const gameTurn = Number(localStorage.getItem("gameTurn")) ?? 0;
    const gameScore = Number(document.getElementById("score")?.getAttribute("data-score")) ?? 0;
    const historyData = {
        userId: _id,
        gameThemeId,
        cardThemeId,
        gameTime,
        gameSize,
        gameScore,
        gameTurn,
    };
    fetch("/api/game-results", {
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
    }
    else {
        showNotifyBoard(gameScore, false);
    }
};
const gameFlow = () => {
    selectTime();
    buttonStart.addEventListener("click", () => {
        startGame();
    });
};
gameFlow();
