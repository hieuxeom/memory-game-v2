const playGame = document.getElementById("playGame") as HTMLButtonElement;
const viewRank = document.getElementById("viewRank") as HTMLButtonElement;
const viewTheme = document.getElementById("viewTheme") as HTMLButtonElement;

playGame?.addEventListener("click", () => {
	window.location.href = "/game";
});

viewRank?.addEventListener("click", () => {
	window.location.href = "/rank";
});

viewTheme?.addEventListener("click", () => {
	window.location.href = "/theme";
});
