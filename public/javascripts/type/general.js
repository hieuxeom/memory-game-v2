let gameSize = localStorage.getItem("gameSize") ?? null;
if (!gameSize) {
    localStorage.setItem("gameSize", "4x4");
    gameSize = "4x4";
}
let currentCardTheme = localStorage.getItem("cardTheme") ?? null;
let currentGameTheme = localStorage.getItem("gameTheme") ?? null;
export { gameSize, currentCardTheme, currentGameTheme };
