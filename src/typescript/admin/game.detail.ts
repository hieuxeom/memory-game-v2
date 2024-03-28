import {ICardThemeResponse} from "../type/cardTheme";
import {IGameData, IGameThemeResponse} from "../type/gameTheme";
import {IApiResponse} from "../type/response";

const gameThemeId: string = (document.getElementById("gameThemeId") as HTMLInputElement).value;
const currentCardThemeId: string = localStorage.getItem("cardTheme") ?? "";
const themeNameDetail: HTMLElement = document.getElementById("themeNameDetail") as HTMLElement;
const themeTotalItemsDetail: HTMLElement = document.getElementById("themeTotalItemsDetail") as HTMLElement;
const themePlayedDetail: HTMLElement = document.getElementById("themePlayedDetail") as HTMLElement;
const themeThumbnail: HTMLImageElement = document.getElementById("themeThumbnail") as HTMLImageElement;
const listThemeDataContainer: HTMLElement = document.getElementById("listThemeDataContainer") as HTMLElement;

const fetchCardData = fetch(`/api/card-themes/${currentCardThemeId}`)
    .then((res) => res.json())
    .then((res: IApiResponse) => {
        console.log(res)
        if (res.status === "success") {
            return res.data
        }
    });
const fetchGameData = fetch(`/api/game-themes/${gameThemeId}/`)
    .then((res) => res.json())
    .then((res: IApiResponse) => {
        if (res.status === "success") {
            return res.data
        }
    });

Promise.all([fetchCardData, fetchGameData]).then(([cardData, gameData]: [ICardThemeResponse, IGameThemeResponse]) => {
    console.log(cardData, gameData);
    const {cardFront} = cardData;

    themeNameDetail.innerHTML = gameData.themeName;
    themeTotalItemsDetail.innerHTML = gameData.themeData.length.toString();
    themePlayedDetail.innerHTML = gameData.played.toString();
    themeThumbnail.src = `/images/game_thumbnails/${gameData.themeThumbnail}`
    listThemeDataContainer.innerHTML = gameData.themeData
        .map((gameTheme: IGameData) => {
            return `
             <div class="relative w-full max-h-[180px] bg-white shadow shadow-lg rounded-xl overflow-hidden">
 				<img src="/images/themepacks/${cardFront}" alt="" />
 				<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
 					<i class="${gameTheme.icon} text-4xl"></i>
 				</div>
 			</div>
            `;
        })
        .join("");
});
