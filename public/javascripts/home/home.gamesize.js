import { gameSize } from "../utils/general.js";
import { Toast } from "../utils/Toast.js";
const listSizeGame = document.querySelectorAll(".difficult-size");
const toast = new Toast();
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
        toast.success(`Select size ${button.getAttribute("data-button")}`);
        localStorage.setItem("gameSize", button.getAttribute("data-button") ?? "");
    });
});
handleDefaultSelected();
