// <div data-value=""
// class="card relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden">
// <div class="card-back h-full">
// <img src="/images/themepacks/1711773872456-test.png" class="w-full h-full" alt/>
// </div>
// </div>

import {IApiResponse} from "../type/response";
import {ICardThemeResponse} from "../type/cardTheme";

const listCards: HTMLElement = document.getElementById("listCards") as HTMLElement;

fetch("/api/card-themes/vip")
    .then((res: Response) => res.json())
    .then((res: IApiResponse): [ICardThemeResponse[], NodeListOf<HTMLElement>] => {
        let listCardsData: ICardThemeResponse[] = [];
        if (res.status === "success") {
            listCardsData = res.data;

            listCards.innerHTML = listCardsData.map(({_id, price, cardBack, cardFront}) => {
                return `<div data-id="${_id}"
                            class="card relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden"
                            >
                                <div class="card-back h-full">
                                    <img src="/images/themepacks/${cardBack}" class="w-full h-full" alt=""/>
                                </div>                            
                            </div>`
            }).join("")
        }

        return [listCardsData, document.querySelectorAll(".card")]

    })
    .then(([listCardsData, listCardsElement]) => {
        listCardsElement.forEach((card) => {
            card.addEventListener("click", () => {
                const _id = card.getAttribute("data-id");
                const selectedData = listCardsData.filter(item => item && item._id === _id)[0];
                setVipDetails(selectedData)
            })
        })
    })

const setVipDetails = ({_id, cardFront, cardBack, price}: ICardThemeResponse) => {
    const backFace = document.querySelector("#vipDetails .back-face") as HTMLImageElement;
    const frontFace = document.querySelector("#vipDetails .front-face") as HTMLImageElement
    const priceValue = document.querySelector("#vipDetails .price") as HTMLElement;
    const buyButton = document.getElementById("#buyButton") as HTMLButtonElement;

    backFace.src = `/images/themepacks/${cardBack}`
    frontFace.src = `/images/themepacks/${cardFront}`
    priceValue.innerHTML = `${price}`;
    buyButton.dataset.price = `${price}`
    buyButton.dataset.id = `${_id}`

}