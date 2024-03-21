import { gameSize } from "../type/general.js";
var listSizeGame = document.querySelectorAll(".difficult-size");
var handleDefaultSelected = function () {
    listSizeGame.forEach(function (button) {
        if (button.getAttribute("data-button") === gameSize) {
            button.classList.add("active");
        }
    });
};
var handleUnSelectedButton = function () {
    listSizeGame.forEach(function (button) {
        button.classList.remove("active");
    });
};
listSizeGame.forEach(function (button) {
    button.addEventListener("click", function () {
        var _a;
        handleUnSelectedButton();
        button.classList.add("active");
        localStorage.setItem("gameSize", (_a = button.getAttribute("data-button")) !== null && _a !== void 0 ? _a : "");
    });
});
handleDefaultSelected();
