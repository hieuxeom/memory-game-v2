let gameSize: string | null = localStorage.getItem("gameSize") ?? null;
if (!gameSize) {
    localStorage.setItem("gameSize", "4x4")
    gameSize = "4x4"
}

let currentCardTheme: string | null = localStorage.getItem("cardTheme") ?? null;
if (!currentCardTheme) {
    localStorage.setItem("cardTheme", "65f1e86d709b790e9f9ad85c")
    currentCardTheme = "65f1e86d709b790e9f9ad85c"
}
let currentGameTheme = localStorage.getItem("gameTheme") ?? null;
if (!currentGameTheme) {
    localStorage.setItem("gameTheme", "65f709ad9d376fdf4644c182")
    currentGameTheme = "65f709ad9d376fdf4644c182"
}
export {gameSize, currentCardTheme, currentGameTheme} ;
