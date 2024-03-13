interface ICardTheme {
	_id: string;
	cardBack: string;
	cardFront: string;
	themeName: string;
}

const themeContainer: HTMLElement = document.getElementById("themeContainer") as HTMLElement;
const currentCardTheme: WindowLocalStorage | string = localStorage.getItem("cardTheme") ?? "";

const handleUnSelectedCard = (listCardThemes: NodeListOf<HTMLElement>) => {
	listCardThemes.forEach((card) => {
		card.classList.remove("selected");
	});
};

const handleLoadingTheme = () => {
	return new Promise<void>((resolve, reject) => {
		fetch("/api/themes")
			.then((res) => res.json())
			.then((listCardThemes: ICardTheme[]): NodeListOf<HTMLElement> => {
				themeContainer.innerHTML = listCardThemes
					.map((card) => {
						return `<div data-value=${card._id} class="theme-card ${
							card._id === currentCardTheme ? "selected" : ""
						} w-full max-h-[180px] bg-white shadow shadow-lg rounded-xl overflow-hidden">
                                    <img src="/images/themepacks/${card.cardBack}" alt="${card.themeName} Card Theme"/>
                                </div>`;
					})
					.join("");

				return document.querySelectorAll(".theme-card");
			})
			.then((listCardThemes: NodeListOf<HTMLElement>) => {
				listCardThemes.forEach((card) => {
					card.addEventListener("click", () => {
						handleUnSelectedCard(listCardThemes);
						card.classList.add("selected");
						localStorage.setItem("cardTheme", card.getAttribute("data-value") ?? "");
					});
				});
			});
	});
};

handleLoadingTheme();
