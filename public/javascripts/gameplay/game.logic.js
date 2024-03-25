import { gameSize } from "../type/general.js";
const sizeGame = gameSize === "4x4" ? 16 : 20;
const gameContainer = document.getElementById("gameContainer") ?? null;
const timer = document.getElementById("secondValue");
const scoreValue = document.getElementById("score");
function shuffleAndSlice(array, length) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.length = length / 2;
    return [...array, ...array];
}
const getCurrentScore = () => {
    return Number(scoreValue.getAttribute("data-score"));
};
const setNewScore = (newScore) => {
    scoreValue.dataset.score = newScore.toString();
    return scoreValue.innerHTML = newScore.toString();
};
const calculateScore = (turns) => {
    if (turns >= 5) {
        return 50;
    }
    let score = 100;
    if (turns > 1 && turns < 5) {
        score -= (turns - 1) * 10;
    }
    return score;
};
const setTotalTurn = (totalTurn) => {
    return localStorage.setItem('gameTurn', totalTurn.toString());
};
export const gameLogic = (listCards) => {
    let countOpenCard = 0;
    let compareValue = [];
    let turnClick = 1;
    let totalTurn = localStorage.getItem('gameTurn') ? Number(localStorage.getItem('gameTurn')) : 0;
    const gameData = shuffleAndSlice(listCards, sizeGame);
    gameContainer.innerHTML = gameData.join("");
    const listOfCards = document.querySelectorAll(".card");
    const handleHideCard = () => {
        countOpenCard = 0;
        compareValue = [];
        return listOfCards.forEach((card) => {
            if (!card.className.includes("matched"))
                card.classList.remove("open");
        });
    };
    listOfCards.forEach((card) => {
        card.addEventListener("click", () => {
            if (countOpenCard < 2) {
                if (!card.className.includes("open")) {
                    countOpenCard++;
                    card.classList.add("open");
                    compareValue.push(card);
                    if (countOpenCard === 2) {
                        totalTurn++;
                        setTotalTurn(totalTurn);
                        if (isMatch(compareValue)) {
                            compareValue.forEach((e) => {
                                e.style.visibility = 'hidden';
                                e.classList.add("matched");
                            });
                            setNewScore(getCurrentScore() + calculateScore(turnClick));
                            turnClick = 1;
                            compareValue = [];
                            countOpenCard = 0;
                            if (document.querySelectorAll(".matched").length === sizeGame && Number(timer.getAttribute("data-time")) > 0) {
                                setTimeout(() => gameLogic(listCards), 250);
                            }
                        }
                        else {
                            setTimeout(() => {
                                turnClick += 1;
                                handleHideCard();
                            }, 500);
                        }
                    }
                }
                else {
                    countOpenCard--;
                    compareValue = [];
                    card.classList.remove("open");
                }
            }
        });
    });
    return listOfCards;
};
const isMatch = ([v1, v2]) => {
    return v1.getAttribute("data-value") === v2.getAttribute("data-value");
};
