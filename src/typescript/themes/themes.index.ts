import {IUser} from "../type/user";

const listTabs = document.querySelectorAll(".btn-tab") as NodeListOf<HTMLButtonElement>;

const searchParams = new URLSearchParams(window.location.search);
const tab = searchParams.get("tab") ?? "card-themes";
listTabs.forEach((button) => {
    if (button.getAttribute("data-tab") === tab) {
        button.classList.add("active")
        button.classList.remove("inactive")
    } else {
        button.classList.add("inactive")
        button.classList.remove("active")
    }
    button.addEventListener("click", () => {
        window.location.href = `/themes?tab=${button.getAttribute("data-tab")}`;
    })
})

export const getListVipCards = () => {
    if (localStorage.getItem("userData")) {
        return (JSON.parse(localStorage.getItem("userData")!) as IUser).userVipItems.cardThemes;
    } else {
        return []
    }
}

export const getListVipGames = () => {
    if (localStorage.getItem("userData")) {
        return (JSON.parse(localStorage.getItem("userData")!) as IUser).userVipItems.gameThemes;
    } else {
        return []
    }
}