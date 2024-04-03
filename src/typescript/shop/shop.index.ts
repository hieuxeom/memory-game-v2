import {IUser} from "../type/user";
import {IApiResponse} from "../type/response";

const userCoins = localStorage.getItem('userData') ? Number((JSON.parse(localStorage.getItem('userData')!) as IUser).coins) : 0;

const listTabs = document.querySelectorAll(".btn-tab") as NodeListOf<HTMLButtonElement>;
const userCoinsValue: HTMLElement = document.getElementById("userCoins") as HTMLElement;
const searchParams = new URLSearchParams(window.location.search);
const tab = searchParams.get("tab") ?? "card-themes";

userCoinsValue.innerHTML = `${userCoins}`

const handleTabDirection = () => {
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
}

const vipDetailsContainer: HTMLElement = document.getElementById("vipDetails") as HTMLElement
vipDetailsContainer.style.visibility = "hidden"

export const handleBuyAction = (postData: any) => {
    const buyButton = document.getElementById("buyButton") as HTMLButtonElement;
    buyButton.addEventListener("click", () => {
        fetch("/api/shop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData),
        }).then((res) => res.json())
            .then((res: IApiResponse) => {
                if (res.status === "success") {
                    localStorage.setItem("userData", JSON.stringify(res.data));
                    window.location.reload();
                } else {
                    console.log(res.message)
                }
            })
    })
}

handleTabDirection();