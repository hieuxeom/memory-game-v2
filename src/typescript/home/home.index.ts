const playGame = document.getElementById("playGame") as HTMLButtonElement;
const viewRank = document.getElementById("viewRank") as HTMLButtonElement;
const viewTheme = document.getElementById("viewTheme") as HTMLButtonElement;
const viewUser = document.getElementById("viewUser") as HTMLButtonElement;

playGame?.addEventListener("click", () => {
	window.location.href = "/game";
});

viewRank?.addEventListener("click", () => {
	window.location.href = "/rank";
});

viewTheme?.addEventListener("click", () => {
	window.location.href = "/themes?tab=card-themes";
});
viewUser?.addEventListener("click", () => {
	window.location.href = "/user";
});
