import { currentCardTheme, getListVipGames } from "../utils/general.js";
import { handleBuyAction } from "./shop.index.js";
const listCards = document.getElementById("listCards");
fetch("/api/game-themes/vip")
    .then((res) => res.json())
    .then((res) => {
    let listGameThemesData = [];
    if (res.status === "success") {
        const ownedVipGames = getListVipGames();
        listGameThemesData = res.data;
        listCards.innerHTML = listGameThemesData.map(({ _id, price, themeThumbnail }) => {
            console.log(ownedVipGames, _id, ownedVipGames.includes(_id));
            return `<div data-id="${_id}"
                            class="card relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden ${ownedVipGames.includes(_id) ? "owned" : ""}"
                            >
                                <div class="card-back h-full">
                                    <img src="/images/game_thumbnails/${themeThumbnail}" class="w-full h-full" alt=""/>
                                </div>                            
                            </div>`;
        }).join("");
    }
    return [listGameThemesData, document.querySelectorAll(".card")];
})
    .then(([listCardsData, listCardsElement]) => {
    listCardsElement.forEach((card) => {
        card.addEventListener("click", () => {
            const _id = card.getAttribute("data-id");
            const isOwned = card.classList.contains("owned");
            const selectedData = listCardsData.filter(item => item && item._id === _id)[0];
            setVipDetails(selectedData, isOwned);
        });
    });
});
const setVipDetails = ({ _id, themeThumbnail, price }, isOwned) => {
    const vipDetailsContainer = document.getElementById("vipDetails");
    vipDetailsContainer.style.visibility = "visible";
    const buttonBuy = document.getElementById("buyButton");
    console.log(isOwned);
    if (isOwned) {
        buttonBuy.style.pointerEvents = "none";
        buttonBuy.disabled = true;
        buttonBuy.innerHTML = "Owned";
    }
    else {
        buttonBuy.style.pointerEvents = "auto";
        buttonBuy.disabled = false;
        buttonBuy.innerHTML = "Buy";
    }
    const themeDataContainer = document.getElementById("themeDataContainer");
    const priceValue = document.querySelector("#vipDetails .price");
    priceValue.innerHTML = `${price}`;
    const getCardTheme = fetch(`/api/card-themes/${currentCardTheme}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            return res.data;
        }
    });
    const getGameTheme = fetch(`/api/game-themes/${_id}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            return res.data;
        }
    });
    Promise.all([getCardTheme, getGameTheme])
        .then(([cardData, gameData]) => {
        const { cardFront } = cardData;
        const { themeData } = gameData;
        themeDataContainer.innerHTML = themeData.map(({ icon, value }) => {
            return `<div class="card open relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden">
                                <div class="bg-transparent card-front w-full h-full">
                                    <div class="bg-transparent">
                                        <img src="/images/themepacks/${cardFront}" class="w-full h-full" alt=""/>
                                    </div>
                                    <div class="bg-transparent absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                        <i class="${icon} text-4xl"></i>
                                    </div>
                                </div>
                            </div>`;
        }).join("");
    });
    const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))._id : "";
    if (userId) {
        const postData = {
            userId,
            themeId: _id,
            typeTheme: "game",
        };
        handleBuyAction(postData);
    }
};
