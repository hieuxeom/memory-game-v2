import { gameSize } from "../utils/general.js";

const listSizeGame: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".difficult-size");

const handleDefaultSelected = () => {
	listSizeGame.forEach((button) => {
		if (button.getAttribute("data-button") === gameSize) {
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
		localStorage.setItem("gameSize", button.getAttribute("data-button") ?? "");
	});
});

handleDefaultSelected();
