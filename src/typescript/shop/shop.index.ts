import {IUser} from "../type/user";

const userCoins = localStorage.getItem('userData') ? Number((JSON.parse(localStorage.getItem('userData')!) as IUser).coins) : 0;

const listTabs = document.querySelectorAll(".btn-tab") as NodeListOf<HTMLButtonElement>;
const userCoinsValue: HTMLElement = document.getElementById("userCoins") as HTMLElement;
const searchParams = new URLSearchParams(window.location.search);
const tab = searchParams.get("tab") ?? "card-themes";

userCoinsValue.innerHTML = `${userCoins}`

listTabs.forEach((button) => {
    if (button.getAttribute("data-tab") === tab) {
        button.classList.add("active")
        button.classList.remove("inactive")
    } else {
        button.classList.add("inactive")
        button.classList.remove("active")
    }
    button.addEventListener("click", () => {
        window.location.href = `/shop?tab=${button.getAttribute("data-tab")}`;
    })
})

const vipDetailsContainer: HTMLElement = document.getElementById("vipDetails") as HTMLElement
vipDetailsContainer.style.visibility = "hidden"
