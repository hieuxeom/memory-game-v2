import { fetchRankData } from "./rank.fetch-data.js";
const listTabButton = document.querySelectorAll(".btn-tab");
const searchParams = new URLSearchParams(window.location.search);
const tab = searchParams.get("tab");
const handleSetInActiveTab = () => {
    listTabButton.forEach((button) => {
        if (button.classList.contains("active")) {
            button.classList.remove("active");
            button.classList.add("inactive");
        }
    });
};
const handleSetActiveTab = (button) => {
    if (button.classList.contains("inactive")) {
        button.classList.remove("inactive");
        button.classList.add("active");
        fetchRankData();
    }
};
const handleSelectDefault = () => {
    listTabButton.forEach((button) => {
        if (button.getAttribute("data-filter") === tab) {
            handleSetInActiveTab();
            handleSetActiveTab(button);
        }
    });
};
listTabButton.forEach((button) => {
    button.addEventListener("click", () => {
        window.location.href = `/rank?tab=${button.getAttribute("data-filter")}`;
    });
});
handleSelectDefault();
fetchRankData();
