import { gameSize } from "../gameplay/game.generator.js";

const listSizeGame: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".difficult-size");

const handleDefaultSelected = () => {
	listSizeGame.forEach((button) => {
		if (button.getAttribute("button-data") === gameSize) {
			button.classList.add("active");
		}
	});
};

const handleUnSelectedButton = () => {
	listSizeGame.forEach((button) => {
		button.classList.remove("active");
	});
};

listSizeGame.forEach((button) => {
	button.addEventListener("click", () => {
		handleUnSelectedButton();
		button.classList.add("active");
		localStorage.setItem("gameSize", button.getAttribute("button-data") ?? "");
	});
});

handleDefaultSelected();
