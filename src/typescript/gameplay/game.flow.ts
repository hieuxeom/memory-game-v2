import {renderGame} from "./game.generator.js";
import {Timer} from "../utils/Timer.js";
import {IUser} from "../type/user";
import {showNotifyBoard} from "./game.notify.js";
import {gameTime, gameSize} from "../utils/general.js";
import {getCurrentScore} from "./game.logic.js";

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

const calculateCoins = () => {
    const currentScore = getCurrentScore();
    let scoreCoin = currentScore * 10 / 100;
    let gameSizeBonus = 0;
    let gameTimeBonus = 0;
    const sizeGame = gameSize === "4x4" ? 16 : 20;

    switch (sizeGame) {
        case 16:
            if (currentScore > 10000) {
                gameSizeBonus = 200
            } else if (currentScore > 5000) {
                gameSizeBonus = 100
            }
            break;
        case 20:
            if (currentScore > 10000) {
                gameSizeBonus = 400
            } else if (currentScore > 5000) {
                gameSizeBonus = 200
            }
            break;
    }

    switch (gameTime) {
        case "60":
            if (currentScore > 10000) {
                gameTimeBonus = 500
            } else if (currentScore > 5000) {
                gameTimeBonus = 250
            }
            break;
        case "120":
            if (currentScore > 15000) {
                gameTimeBonus = 500
            } else if (currentScore > 10000) {
                gameTimeBonus = 250
            }
            break;
        case "300":
            if (currentScore > 20000) {
                gameTimeBonus = 500
            } else if (currentScore > 15000) {
                gameTimeBonus = 250
            }
            break;
        default:
            break;
    }

    return {
        scoreCoin,
        gameTimeBonus,
        gameSizeBonus,
        totalCoins: scoreCoin + gameTimeBonus + gameSizeBonus,
    };
}

const handleGameWin = () => {
    let _id: string | null = localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")!) as IUser)._id : null;
    const {scoreCoin, gameTimeBonus, gameSizeBonus, totalCoins} = calculateCoins();

    if (!_id) {
        if (localStorage.getItem("guestId")) {
            _id = localStorage.getItem("guestId");
        } else {
            _id = `guestPlayer${Date.now()}`
            localStorage.setItem("guestId", _id)
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
        totalCoins,
    };

    fetch("/api/game-results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(historyData),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.status === "success" && res.data) {
                localStorage.setItem("userData", JSON.stringify(res.data))
            }
        });

    if (_id) {
        showNotifyBoard(gameScore, totalCoins, scoreCoin, gameSizeBonus, gameTimeBonus);
    } else {
        showNotifyBoard(gameScore);

    }
};

const gameFlow = () => {
    selectTime();
    buttonStart.addEventListener("click", () => {
        startGame()
    })
}

gameFlow()