import {gameSize, gameTime} from "../type/general.js";

const sizeGame = gameSize === "4x4" ? 16 : 20;
const gameContainer: HTMLElement = (document.getElementById("gameContainer") as HTMLElement) ?? null;
const timer: HTMLElement = document.getElementById("secondValue") as HTMLElement;
const scoreValue: HTMLElement = document.getElementById("score") as HTMLElement;

function shuffleAndSlice(array: string[], length: number): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    array.length = length / 2;

    return [...array, ...array];
}

export const getCurrentScore = () => {
    return Number(scoreValue.getAttribute("data-score"))
}

const setNewScore = (newScore: number) => {
    scoreValue.dataset.score = newScore.toString();
    return scoreValue.innerHTML = newScore.toString();
}

const calculateScore = (turns: number) => {

    if (turns >= 5) {
        return 50
    }

    let score = 100;

    if (turns > 1 && turns < 5) {
        score -= (turns - 1) * 10;
    }

    return score

}

const setTotalTurn = (totalTurn: number) => {
    return localStorage.setItem('gameTurn', totalTurn.toString())
}

export const gameLogic = (listCards: string[]) => {
    let countOpenCards = 0;
    let countMatchedCards = 0;
    let compareValue: HTMLElement[] = [];
    let turnClick = 1;
    let totalTurn = localStorage.getItem('gameTurn') ? Number(localStorage.getItem('gameTurn')) : 0;
    const gameData = shuffleAndSlice(listCards, sizeGame);
    gameContainer.innerHTML = gameData.join("");
    const listOfCards: NodeListOf<HTMLElement> = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;

    const handleHideCard = () => {
        countOpenCards = 0;
        compareValue = [];
        return listOfCards.forEach((card) => {
            if (!card.className.includes("matched") && card.className.includes("open")) {
                card.classList.remove("open");
                card.classList.remove("open-effect")
                card.classList.add("close-effect")
            }
        });
    };

    listOfCards.forEach((card) => {
        card.addEventListener("click", () => {
            if (countOpenCards < 2) {
                if (!card.className.includes("open")) {
                    countOpenCards++;
                    card.classList.remove("close-effect")
                    card.classList.add("open");
                    card.classList.add("open-effect")
                    compareValue.push(card);
                    if (countOpenCards === 2) {
                        totalTurn++;
                        setTotalTurn(totalTurn);

                        if (isMatch(compareValue)) {
                            let tempCompare = compareValue;
                            countMatchedCards += 2
                            setTimeout(() => {
                                tempCompare.forEach((e) => {
                                    e.style.visibility = 'hidden'
                                    e.classList.add("matched")
                                });
                            }, 500)

                            setNewScore(getCurrentScore() + calculateScore(turnClick))
                            turnClick = 1;
                            compareValue = [];
                            countOpenCards = 0;

                            if (countMatchedCards === sizeGame && Number(timer.getAttribute("data-time")) > 0) {
                                setTimeout(() => gameLogic(listCards), 250)
                            }
                        } else {
                            setTimeout(() => {
                                turnClick += 1;
                                handleHideCard();
                            }, 500);
                        }
                    }
                } else {
                    countOpenCards--;
                    compareValue = [];
                    card.classList.remove("open");
                    card.classList.remove("open-effect");
                    card.classList.add("close-effect")
                }
            }
        });
    });

    return listOfCards;
};

const isMatch = ([v1, v2]: HTMLElement[]): boolean => {
    return v1.getAttribute("data-value") === v2.getAttribute("data-value");
};
