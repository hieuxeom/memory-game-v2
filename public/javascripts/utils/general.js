let gameSize = localStorage.getItem("gameSize") ?? null;
if (!gameSize) {
    localStorage.setItem("gameSize", "4x4");
    gameSize = "4x4";
}
let gameTime = localStorage.getItem("gameTime") ?? null;
let currentCardTheme = localStorage.getItem("cardTheme") ?? null;
let currentGameTheme = localStorage.getItem("gameTheme") ?? null;
export const getListVipCards = () => {
    if (localStorage.getItem("userData")) {
        return JSON.parse(localStorage.getItem("userData")).userVipItems.cardThemes;
    }
    else {
        return [];
    }
};
export const getListVipGames = () => {
    if (localStorage.getItem("userData")) {
        return JSON.parse(localStorage.getItem("userData")).userVipItems.gameThemes;
    }
    else {
        return [];
    }
};
export { gameSize, gameTime, currentCardTheme, currentGameTheme };
