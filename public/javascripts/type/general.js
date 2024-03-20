var _a, _b, _c;
var gameSize = (_a = localStorage.getItem("gameSize")) !== null && _a !== void 0 ? _a : null;
if (!gameSize) {
    localStorage.setItem("gameSize", "4x4");
    gameSize = "4x4";
}
var currentCardTheme = (_b = localStorage.getItem("cardTheme")) !== null && _b !== void 0 ? _b : null;
var currentGameTheme = (_c = localStorage.getItem("gameTheme")) !== null && _c !== void 0 ? _c : null;
export { gameSize, currentCardTheme, currentGameTheme };
