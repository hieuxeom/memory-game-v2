import {ICardThemeResponse} from "../type/cardTheme";
import {IGameData, IGameThemeResponse} from "../type/gameTheme";
import {gameSize} from "../type/general.js";
import {gameLogic} from "./game.logic.js";
import {GameCard} from "../utils/Card.js";

const gameContainer: HTMLElement = (document.getElementById("gameContainer") as HTMLElement) ?? null;

const cardThemeId: WindowLocalStorage | string = localStorage.getItem("cardTheme") ?? "";
const gameThemeId: WindowLocalStorage | string = localStorage.getItem("gameTheme") ?? "65f709ad9d376fdf4644c182";

function shuffleAndSlice(array: IGameData[], length: number): IGameData[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    array.length = length;

    return [...array, ...array];
}

const gameData = fetch(`/api/game-themes/${gameThemeId}`).then((res) => res.json());
const cardData = fetch(`/api/card-themes/${cardThemeId}`).then((res) => res.json());
Promise.all([gameData, cardData])
    .then(([gameDataResponse, cardDataResponse]: [IGameThemeResponse, ICardThemeResponse]): NodeListOf<HTMLElement> => {
        const {themeData: gameThemeData} = gameDataResponse;
        return renderCards(gameThemeData, cardDataResponse);
    })
    .then((listCards: NodeListOf<HTMLElement>) => {
        gameLogic(listCards);
    });

const renderCards = (gameData: IGameData[], {cardBack, cardFront}: ICardThemeResponse): NodeListOf<HTMLElement> => {
    const gameDataShuffled = shuffleAndSlice(gameData, gameSize === "4x4" ? 8 : 10);
    const listOfCards = gameDataShuffled.map(({icon, value}) => new GameCard({
        cardFront,
        cardBack,
        icon,
        value
    }))
    
    gameContainer.innerHTML = listOfCards.map((card) => card.render(gameSize === "4x4")).join("");

    return document.querySelectorAll(".card");
};
