import {gameSize} from "../type/general.js";
import {IUser} from "../type/user.js";
import {handleStopTimer} from "./game.timer.js";
import {showNotifyBoard} from "./game.notify.js";
import {GameCard} from "../utils/Card";

const sizeGame = gameSize === "4x4" ? 16 : 20;

export const gameLogic = (listCards: NodeListOf<HTMLElement>) => {
    let countOpenCard = 0;

    let compareValue: HTMLElement[] = [];
    const handleHideCard = () => {
        countOpenCard = 0;
        compareValue = [];
        return listCards.forEach((card) => {
            if (!card.className.includes("matched")) card.classList.remove("open");
        });
    };

    listCards.forEach((card) => {
        card.addEventListener("click", () => {
            if (countOpenCard < 2) {
                if (!card.className.includes("open")) {
                    countOpenCard++;
                    card.classList.add("open");

                    compareValue.push(card);

                    if (countOpenCard === 2) {
                        console.log(isMatch(compareValue));
                        if (isMatch(compareValue)) {
                            compareValue.forEach((e) => e.classList.add("matched"));
                            compareValue = [];
                            countOpenCard = 0;

                            if (document.querySelectorAll(".matched").length === sizeGame) {
                                const gameTime = handleStopTimer();
                                handleGameWin(gameTime, sizeGame);
                            }
                        } else {
                            setTimeout(() => {
                                handleHideCard();
                            }, 500);
                        }
                    }
                } else {
                    countOpenCard--;
                    compareValue = [];
                    card.classList.remove("open");
                }
            }
        });
    });
};

const isMatch = ([v1, v2]: HTMLElement[]): boolean => {
    return v1.getAttribute("data-value") === v2.getAttribute("data-value");
};

const handleGameWin = (gameTime: number, gameSize: number) => {
    const _id: string | null = localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")!) as IUser)._id : null;
    console.log(_id);

    const gameThemeId = localStorage.getItem("gameTheme");
    const cardThemeId = localStorage.getItem("cardTheme");
    const historyData = {
        userId: _id ?? `guestPlayer${Date.now()}`,
        gameThemeId,
        cardThemeId,
        gameTime,
        gameSize,
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
        showNotifyBoard(gameTime);
    } else {
        showNotifyBoard(gameTime, false);

    }

};
