import {IGameData, IGameThemeResponse} from "../type/gameTheme";
import {ICardThemeResponse} from "../type/cardTheme";
import {currentCardTheme, currentGameTheme} from "../type/general.js";

const cardThemeContainer: HTMLElement = document.getElementById("cardThemeContainer") as HTMLElement;
const gameThemeContainer: HTMLElement = document.getElementById("gameThemeContainer") as HTMLElement;

const handleUnSelectedCard = (listCardThemes: NodeListOf<HTMLElement>) => {
    listCardThemes.forEach((card) => {
        card.classList.remove("selected");
    });
};

const handleUnSelectedGame = (listGameThemes: NodeListOf<HTMLElement>) => {
    listGameThemes.forEach((game) => {
        game.classList.remove("selected");
    });
};

const loadingCardTheme = () => {
    return new Promise<void>((resolve, reject) => {
        fetch("/api/card-themes")
            .then((res) => res.json())
            .then((listCardThemes: ICardThemeResponse[]): NodeListOf<HTMLElement> => {
                let idSelected = currentCardTheme;
                if (!currentCardTheme) {
                    idSelected = listCardThemes[0]._id;
                    localStorage.setItem("cardTheme", idSelected)
                }
                cardThemeContainer.innerHTML = listCardThemes
                    .map((card) => {
                        return `<div data-value=${card._id}
									class="theme-card ${card._id === idSelected ? "selected" : ""} w-full max-h-[145px] bg-white shadow shadow-lg rounded-xl overflow-hidden"
								>
									<img class="h-full w-full" src="/images/themepacks/${card.cardBack}" alt="${card.themeName} Card Theme"/>
                                </div>`;
                    }).join("");

                return document.querySelectorAll(".theme-card");
            }).then((listCardThemes: NodeListOf<HTMLElement>) => {
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

const loadingGameTheme = () => {
    return new Promise<void>((resolve, reject) => {
        fetch("/api/game-themes")
            .then((res) => res.json())
            .then((listGameThemes: IGameThemeResponse[]): NodeListOf<HTMLElement> => {
                let idSelected = currentGameTheme;
                if (!currentCardTheme) {
                    idSelected = listGameThemes[0]._id;
                    localStorage.setItem("gameTheme", idSelected)
                }
                gameThemeContainer.innerHTML = listGameThemes
                    .map((game: IGameThemeResponse) => {
                        return `<div class="flex flex-col justify-center items-center gap-2">
                                    <div data-value=${game._id} 
                                        class="theme-game ${game._id === idSelected ? "selected" : ""}
                                        w-full max-h-[145px] bg-white shadow shadow-lg  overflow-hidden"
                                        >
                                        <img src="/images/game_thumbnails/${game.themeThumbnail}" alt="${game.themeName} Card Theme"/>
                                    </div>
								    <p class="text-xl text-secondary">${game.themeName}</p>
								</div>`;
                    })
                    .join("");

                return document.querySelectorAll(".theme-game");
            })
            .then((listGameThemes: NodeListOf<HTMLElement>) => {
                listGameThemes.forEach((game) => {
                    game.addEventListener("click", () => {
                        handleUnSelectedGame(listGameThemes);
                        game.classList.add("selected");
                        localStorage.setItem("gameTheme", game.getAttribute("data-value") ?? "");
                    });
                });
            });
    });
};

loadingCardTheme();
loadingGameTheme();
