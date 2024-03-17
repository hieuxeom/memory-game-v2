import { IGameData } from "./../type/gameTheme";
import { ICardThemeResponse } from "../type/cardTheme";
import { IGameData, IGameDataResponse } from "../type/gameTheme";

const gameContainer: HTMLElement = (document.getElementById("gameContainer") as HTMLElement) ?? null;

const size = localStorage.getItem("difficult") === "4x4" ? 16 : 20;
const themeId: WindowLocalStorage | string = localStorage.getItem("cardTheme") ?? "";

function shuffleAndSlice(array: IGameData[], length: number): IGameData[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	array.length = length;

	return [...array, ...array];
}

export const gameSize = localStorage.getItem("gameSize");

const gameThemeId = localStorage.getItem("gameThemeId") ?? "65f709ad9d376fdf4644c182";

const gameData = fetch(`/api/game-themes/${gameThemeId}`).then((res) => res.json());
const cardData = fetch(`/api/card-themes/${themeId}`).then((res) => res.json());

Promise.all([gameData, cardData])
	.then(([gameDataResponse, cardDataResponse]): NodeListOf<HTMLDivElement> => {
		const { themeData: gameThemeData } = gameDataResponse;
		renderCards(gameThemeData, cardDataResponse);
		return document.querySelectorAll(".card");
	})
	.then((listCards: NodeListOf<HTMLDivElement>) => {
		let countOpenCard = 0;
		const handleHideCard = () => {
			countOpenCard = 0;
			return listCards.forEach((card) => card.classList.remove("open"));
		};

		listCards.forEach((card) => {
			card.addEventListener("click", () => {
				if (!card.className.includes("open")) {
					countOpenCard++;
					if (countOpenCard === 2) {
						setTimeout(() => {
							handleHideCard();
						}, 500);
					}
					card.classList.add("open");
				} else {
					countOpenCard--;
					card.classList.remove("open");
				}
			});
		});
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

const renderCards = (gameData: IGameData[], { cardBack, cardFront }: ICardThemeResponse) => {
	const gameDataShuffled = shuffleAndSlice(gameData, gameSize === "4x4" ? 8 : 10);

	gameContainer.innerHTML = gameDataShuffled.map(({ icon, value }: IGameData) => cardComps(cardBack, cardFront, icon, value)).join("");
};
