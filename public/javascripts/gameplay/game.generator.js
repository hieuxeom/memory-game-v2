import { gameSize } from "../utils/general.js";
import { gameLogic } from "./game.logic.js";
import { GameCard } from "../utils/Card.js";
const gameContainer = document.getElementById("gameContainer") ?? null;
const cardThemeId = localStorage.getItem("cardTheme") ?? "";
const gameThemeId = localStorage.getItem("gameTheme") ?? "65f709ad9d376fdf4644c182";
export const renderGame = async () => {
    const gameData = fetch(`/api/game-themes/${gameThemeId}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            return res.data;
        }
    });
    const cardData = fetch(`/api/card-themes/${cardThemeId}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            return res.data;
        }
    });
    let result0 = await Promise.all([gameData, cardData]);
    const [gameDataResponse, cardDataResponse] = result0;
    const { themeData: gameThemeData } = gameDataResponse;
    let listCards = renderCards(gameThemeData, cardDataResponse);
    return gameLogic(listCards);
};
const renderCards = (gameData, { cardBack, cardFront }) => {
    // const gameDataShuffled = shuffleAndSlice(gameData, gameSize === "4x4" ? 8 : 10);
    const listOfCards = gameData.map(({ icon, value }) => new GameCard({
        cardFront,
        cardBack,
        icon,
        value
    }));
    return listOfCards.map((card) => card.render(gameSize === "4x4"));
};
