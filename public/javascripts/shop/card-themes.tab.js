// <div data-value=""
// class="card relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden">
// <div class="card-back h-full">
// <img src="/images/themepacks/1711773872456-test.png" class="w-full h-full" alt/>
// </div>
// </div>
const listCards = document.getElementById("listCards");
fetch("/api/card-themes/vip")
    .then((res) => res.json())
    .then((res) => {
    let listCardsData = [];
    if (res.status === "success") {
        listCardsData = res.data;
        listCards.innerHTML = listCardsData.map(({ _id, price, cardBack, cardFront }) => {
            return `<div data-id="${_id}"
                            class="card relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden"
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
            const selectedData = listCardsData.filter(item => item && item._id === _id)[0];
            setVipDetails(selectedData);
        });
    });
});
const setVipDetails = ({ _id, cardFront, cardBack, price }) => {
    const backFace = document.querySelector("#vipDetails .back-face");
    const frontFace = document.querySelector("#vipDetails .front-face");
    const priceValue = document.querySelector("#vipDetails .price");
    const buyButton = document.getElementById("#buyButton");
    backFace.src = `/images/themepacks/${cardBack}`;
    frontFace.src = `/images/themepacks/${cardFront}`;
    priceValue.innerHTML = `${price}`;
    buyButton.dataset.price = `${price}`;
    buyButton.dataset.id = `${_id}`;
};
export {};
