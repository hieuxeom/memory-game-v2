import { ICardThemeResponse } from "../type/cardTheme";
import { IGameData, IGameDataResponse } from "../type/gameTheme";
import { gameSize } from "../type/general.js";
import { gameLogic } from "./game.logic.js";

const gameContainer: HTMLElement = (document.getElementById("gameContainer") as HTMLElement) ?? null;

const cardThemeId: WindowLocalStorage | string = localStorage.getItem("cardTheme") ?? "";
const gameThemeId: WindowLocalStorage | string = localStorage.getItem("gameTheme") ?? "65f709ad9d376fdf4644c182";

function shuffleAndSlice(array: IGameData[], length: number): IGameData[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	array.length = length;

	return [...array, ...array];
}

const gameData = fetch(`/api/game-themes/${gameThemeId}`).then((res) => res.json());
const cardData = fetch(`/api/card-themes/${cardThemeId}`).then((res) => res.json());

Promise.all([gameData, cardData])
	.then(([gameDataResponse, cardDataResponse]): NodeListOf<HTMLElement> => {
		const { themeData: gameThemeData } = gameDataResponse;
		return renderCards(gameThemeData, cardDataResponse);
	})
	.then((listCards: NodeListOf<HTMLElement>) => {
		gameLogic(listCards);
	});

const cardComps = (cardBack: string, cardFront: string, icon: string, value: string) => {
	return `<div data-value="${value}" class="card relative shadow-lg h-[${
		gameSize === "4x4" ? "170" : "135"
	}px] rounded-lg overflow-hidden" data-value="${value}">
    <div class="card-back h-full">
        <img src="/images/themepacks/${cardBack}" class="w-full h-full"/>
    </div>
    <div class="card-front w-full h-full">
		<div>
			<img src="/images/themepacks/${cardFront}" class="w-full h-full"/>
		</div>
		<div class="absolute top-0 left-0 bg-white w-auto h-full shadow-lg"></div>
        <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <i class="${icon} text-4xl"></i>
        </div>
    </div>
</div>`;
};

const renderCards = (gameData: IGameData[], { cardBack, cardFront }: ICardThemeResponse): NodeListOf<HTMLElement> => {
	const gameDataShuffled = shuffleAndSlice(gameData, gameSize === "4x4" ? 8 : 10);
	gameContainer.innerHTML = gameDataShuffled.map(({ icon, value }: IGameData) => cardComps(cardBack, cardFront, icon, value)).join("");
	return document.querySelectorAll(".card");
};
