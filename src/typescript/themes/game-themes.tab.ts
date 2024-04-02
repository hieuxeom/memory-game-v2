import {IApiResponse} from "../type/response";
import {GameThemeCard} from "../utils/Card.js";
import {currentCardTheme, currentGameTheme} from "../type/general.js";
import {IGameThemeResponse} from "../type/gameTheme.js";
import {getListVipGames} from "./themes.index.js";

const themeContainer: HTMLElement = document.getElementById("themeContainer") as HTMLElement;
const searchBox: HTMLInputElement = document.getElementById("searchBox") as HTMLInputElement;

const getListGameThemes = (search?: string) => {
    const ownedVipGames: string[] = getListVipGames();
    return fetch(`/api/game-themes?${search ? (`_s=${search}`) : ""}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse): GameThemeCard[] => {
            if (res.status === "success") {
                let listGameThemes: IGameThemeResponse[] = res.data
                let idSelected = currentGameTheme;

                listGameThemes = listGameThemes.filter((game) => {
                    if (!game.isVip) {
                        return game
                    }

                    if (game.isVip && ownedVipGames.includes(game._id)) {
                        return game
                    }

                })

                if (!currentCardTheme) {
                    idSelected = listGameThemes[0]._id;
                    localStorage.setItem("gameTheme", idSelected!)
                }

                const mapCardComponent: GameThemeCard[] = listGameThemes.map((theme: IGameThemeResponse) => new GameThemeCard({
                    themeThumbnail: theme.themeThumbnail,
                    themeName: theme.themeName,
                    _id: theme._id
                }))

                themeContainer.innerHTML = mapCardComponent
                    .map((Card) => {
                        return Card.render(idSelected === Card._id);
                    })
                    .join("");

                return mapCardComponent;
            }
            return []
        })
        .then((mapCardComponent: GameThemeCard[]) => {
            mapCardComponent.forEach((game) => {
                game.setSelectEvent()
            });
        })
};

getListGameThemes();

searchBox.addEventListener("input", () => {
    getListGameThemes(searchBox.value);
})