import { gameSize } from "../type/general.js";
import { IUser } from "../type/user.js";
import { handleStopTimer } from "./game.timer.js";

const sizeGame = gameSize === "4x4" ? 16 : 20;

export const gameLogic = (listCards: NodeListOf<HTMLElement>) => {
	let countOpenCard = 0;

	let compareValue: HTMLElement[] = [];
	const handleHideCard = () => {
		countOpenCard = 0;
		compareValue = [];
		return listCards.forEach((card) => {
			if (!card.className.includes("matched")) card.classList.remove("open");
		});
	};

	listCards.forEach((card) => {
		card.addEventListener("click", () => {
			if (countOpenCard < 2) {
				if (!card.className.includes("open")) {
					countOpenCard++;
					card.classList.add("open");

					compareValue.push(card);

					if (countOpenCard === 2) {
						console.log(isMatch(compareValue));
						if (isMatch(compareValue)) {
							compareValue.forEach((e) => e.classList.add("matched"));
							compareValue = [];
							countOpenCard = 0;

							if (document.querySelectorAll(".matched").length === sizeGame) {
								const gameTime = handleStopTimer();
								console.log("🚀 ~ card.addEventListener ~ gameTime:", gameTime);
							}
						} else {
							setTimeout(() => {
								handleHideCard();
							}, 500);
						}
					}
				} else {
					countOpenCard--;
					compareValue = [];
					card.classList.remove("open");
				}
			}
		});
	});
};

const isMatch = ([v1, v2]: HTMLElement[]): boolean => {
	return v1.getAttribute("data-value") === v2.getAttribute("data-value");
};

const handleGameWin = () => {
	const { _id }: IUser = JSON.parse(localStorage.getItem("userData")!) as IUser;
	// const;
	// const historyData = {
	// 	userId: _id,
	// 	game,
	// };
};
