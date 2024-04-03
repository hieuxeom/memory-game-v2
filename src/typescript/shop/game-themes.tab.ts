import {IApiResponse} from "../type/response";
import {ICardThemeResponse} from "../type/cardTheme";
import {IUser} from "../type/user";
import {IGameThemeResponse} from "../type/gameTheme";
import {currentCardTheme, getListVipGames} from "../utils/general.js";
import {handleBuyAction} from "./shop.index.js";

const listCards: HTMLElement = document.getElementById("listCards") as HTMLElement;

fetch("/api/game-themes/vip")
    .then((res: Response) => res.json())
    .then((res: IApiResponse): [IGameThemeResponse[], NodeListOf<HTMLElement>] => {
        let listGameThemesData: IGameThemeResponse[] = [];
        if (res.status === "success") {

            const ownedVipGames = getListVipGames();

            listGameThemesData = res.data;

            listCards.innerHTML = listGameThemesData.map(({_id, price, themeThumbnail}) => {
                console.log(ownedVipGames, _id, ownedVipGames.includes(_id));
                return `<div data-id="${_id}"
                            class="card relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden ${ownedVipGames.includes(_id) ? "owned" : ""}"
                            >
                                <div class="card-back h-full">
                                    <img src="/images/game_thumbnails/${themeThumbnail}" class="w-full h-full" alt=""/>
                                </div>                            
                            </div>`
            }).join("")
        }

        return [listGameThemesData, document.querySelectorAll(".card")]

    })
    .then(([listCardsData, listCardsElement]) => {
        listCardsElement.forEach((card) => {
            card.addEventListener("click", () => {
                const _id = card.getAttribute("data-id");
                const isOwned = card.classList.contains("owned")
                const selectedData = listCardsData.filter(item => item && item._id === _id)[0];
                setVipDetails(selectedData, isOwned)
            })
        })
    })

const setVipDetails = ({_id, themeThumbnail, price}: IGameThemeResponse, isOwned: boolean) => {

    const vipDetailsContainer: HTMLElement = document.getElementById("vipDetails") as HTMLElement
    vipDetailsContainer.style.visibility = "visible";

    const buttonBuy: HTMLButtonElement = document.getElementById("buyButton") as HTMLButtonElement
    console.log(isOwned)
    if (isOwned) {
        buttonBuy.style.pointerEvents = "none";
        buttonBuy.disabled = true;
        buttonBuy.innerHTML = "Owned"
    } else {
        buttonBuy.style.pointerEvents = "auto";
        buttonBuy.disabled = false;
        buttonBuy.innerHTML = "Buy"
    }

    const themeDataContainer: HTMLElement = document.getElementById("themeDataContainer") as HTMLElement;

    const priceValue = document.querySelector("#vipDetails .price") as HTMLElement;
    priceValue.innerHTML = `${price}`;

    const getCardTheme = fetch(`/api/card-themes/${currentCardTheme}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === "success") {
                return res.data
            }
        })
    const getGameTheme = fetch(`/api/game-themes/${_id}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === "success") {
                return res.data
            }
        })

    Promise.all([getCardTheme, getGameTheme])
        .then(([cardData, gameData]) => {
            const {cardFront} = cardData;
            const {themeData}: IGameThemeResponse = gameData;
            themeDataContainer.innerHTML = themeData.map(({icon, value}) => {
                return `<div class="card open relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden">
                                <div class="bg-transparent card-front w-full h-full">
                                    <div class="bg-transparent">
                                        <img src="/images/themepacks/${cardFront}" class="w-full h-full" alt=""/>
                                    </div>
                                    <div class="bg-transparent absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                        <i class="${icon} text-4xl"></i>
                                    </div>
                                </div>
                            </div>`
            }).join("")

        })

    const userId = localStorage.getItem('userData') ? (JSON.parse(localStorage.getItem('userData')!) as IUser)._id : "";
    if (userId) {
        const postData = {
            userId,
            themeId: _id,
            typeTheme: "game",
        }
        handleBuyAction(postData)

    }
}

