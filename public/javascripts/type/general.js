var _a, _b, _c;
var gameSize = (_a = localStorage.getItem("gameSize")) !== null && _a !== void 0 ? _a : null;
if (!gameSize) {
    localStorage.setItem("gameSize", "4x4");
    gameSize = "4x4";
}
var currentCardTheme = (_b = localStorage.getItem("cardTheme")) !== null && _b !== void 0 ? _b : null;
if (!currentCardTheme) {
    localStorage.setItem("cardTheme", "65f1e86d709b790e9f9ad85c");
    currentCardTheme = "65f1e86d709b790e9f9ad85c";
}
var currentGameTheme = (_c = localStorage.getItem("gameTheme")) !== null && _c !== void 0 ? _c : null;
if (!currentGameTheme) {
    localStorage.setItem("gameTheme", "65f709ad9d376fdf4644c182");
    currentGameTheme = "65f709ad9d376fdf4644c182";
}
export { gameSize, currentCardTheme, currentGameTheme };
