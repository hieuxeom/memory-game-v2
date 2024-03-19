import { ICardThemeResponse } from "../type/cardTheme";
import { IGameData, IGameThemeResponse } from "../type/gameTheme";

const gameThemeId: string = (document.getElementById("gameThemeId") as HTMLInputElement).value;
const currentCardThemeId: string = localStorage.getItem("cardTheme") ?? "";
const themeNameValue: HTMLElement = document.getElementById("themeNameValue") as HTMLElement;
const themeNameDetail: HTMLElement = document.getElementById("themeNameDetail") as HTMLElement;
const themeTotalItemsDetail: HTMLElement = document.getElementById("themeTotalItemsDetail") as HTMLElement;
const themePlayedDetail: HTMLElement = document.getElementById("themePlayedDetail") as HTMLElement;
const listThemeDataContainer: HTMLElement = document.getElementById("listThemeDataContainer") as HTMLElement;

const fetchCardData = fetch(`/api/card-themes/${currentCardThemeId}`).then((response) => response.json());
const fetchGameData = fetch(`/api/game-themes/${gameThemeId}/`).then((response) => response.json());

Promise.all([fetchCardData, fetchGameData]).then(([cardData, gameData]: [ICardThemeResponse, IGameThemeResponse]) => {
	const { cardFront } = cardData;

	themeNameValue.innerHTML = gameData.themeName;

	themeNameDetail.innerHTML = gameData.themeName;
	themeTotalItemsDetail.innerHTML = gameData.themeData.length.toString();
	themePlayedDetail.innerHTML = gameData.played.toString();

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
