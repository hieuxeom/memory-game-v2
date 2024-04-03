import { handleBuyAction } from "./shop.index.js";
import { getListVipCards } from "../utils/general.js";
const listCards = document.getElementById("listCards");
fetch("/api/card-themes/vip")
    .then((res) => res.json())
    .then((res) => {
    let listCardsData = [];
    const ownedVipCards = getListVipCards();
    if (res.status === "success") {
        listCardsData = res.data;
        listCards.innerHTML = listCardsData.map(({ _id, price, cardBack, cardFront }) => {
            return `<div data-id="${_id}"
                            class="card relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden ${ownedVipCards.includes(_id) ? "owned" : ""}"
                            >
                                <div class="card-back h-full">
                                    <img src="/images/themepacks/${cardBack}" class="w-full h-full" alt=""/>
                                </div>                            
                            </div>`;
        }).join("");
    }
    return [listCardsData, document.querySelectorAll(".card")];
})
    .then(([listCardsData, listCardsElement]) => {
    listCardsElement.forEach((card) => {
        card.addEventListener("click", () => {
            const _id = card.getAttribute("data-id");
            const isOwned = card.classList.contains("owned");
            console.log(isOwned);
            const selectedData = listCardsData.filter(item => item && item._id === _id)[0];
            setVipDetails(selectedData, isOwned);
        });
    });
});
const setVipDetails = ({ _id, cardFront, cardBack, price }, isOwned) => {
    const vipDetailsContainer = document.getElementById("vipDetails");
    vipDetailsContainer.style.visibility = "visible";
    const backFace = document.querySelector("#vipDetails .back-face");
    const frontFace = document.querySelector("#vipDetails .front-face");
    const priceValue = document.querySelector("#vipDetails .price");
    const buttonBuy = document.getElementById("buyButton");
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
    backFace.src = `/images/themepacks/${cardBack}`;
    frontFace.src = `/images/themepacks/${cardFront}`;
    priceValue.innerHTML = `${price}`;
    const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))._id : "";
    if (userId) {
        const postData = {
            userId,
            themeId: _id,
            typeTheme: "card",
        };
        handleBuyAction(postData);
    }
};
