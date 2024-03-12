const playGame = document.getElementById("playGame") as HTMLButtonElement;
const viewRank = document.getElementById("viewRank") as HTMLButtonElement;

playGame?.addEventListener("click", () => {
	window.location.href = "/game";
});

viewRank?.addEventListener("click", () => {
	window.location.href = "/rank";
});
