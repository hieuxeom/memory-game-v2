import {IGameData, IGameThemeResponse} from "../type/gameTheme";
import {ICardThemeResponse} from "../type/cardTheme";
import {currentCardTheme, currentGameTheme} from "../type/general.js";
import {CardThemeCard, GameThemeCard} from "../utils/Card.js";
import {IApiResponse} from "../type/response.js";

const cardThemeContainer: HTMLElement = document.getElementById("cardThemeContainer") as HTMLElement;
const gameThemeContainer: HTMLElement = document.getElementById("gameThemeContainer") as HTMLElement;

const loadingCardTheme = () => {
        return new Promise<void>((resolve, reject) => {
                fetch("/api/card-themes")
                    .then((res) => res.json())
                    .then((res: IApiResponse): CardThemeCard[] => {
                        if (res.status === "success") {
                            const listCardThemes: ICardThemeResponse[] = res.data;
                            let idSelected = currentCardTheme;
                            if (!currentCardTheme) {
                                idSelected = listCardThemes[0]._id;
                                localStorage.setItem("cardTheme", idSelected)
                            }

                            const mapCardComponent: CardThemeCard[] = listCardThemes
                                .map((theme) => {
                                    return new CardThemeCard({
                                        _id: theme._id,
                                        cardBack: theme.cardBack,
                                        themeName: theme.themeName
                                    })
                                })

                            cardThemeContainer.innerHTML = mapCardComponent
                                .map((card) => card.render(idSelected === card._id)).join("");

                            return mapCardComponent;
                        }
                        return [];
                    }).then((mapCardComponent: CardThemeCard[]) => {
                    mapCardComponent.forEach((Card) => {
                        Card.setSelectEvent()
                    })
                });
            }
        )
            ;
    }
;

const loadingGameTheme = () => {
    return new Promise<void>((resolve, reject) => {
        fetch("/api/game-themes")
            .then((res: Response) => res.json())
            .then((res: IApiResponse): GameThemeCard[] => {
                if (res.status === "success") {
                    const listGameThemes = res.data
                    let idSelected = currentGameTheme;

                    if (!currentCardTheme) {
                        idSelected = listGameThemes[0]._id;
                        localStorage.setItem("gameTheme", idSelected!)
                    }

                    const mapCardComponent: GameThemeCard[] = listGameThemes.map((theme: IGameThemeResponse) => new GameThemeCard({
                        themeThumbnail: theme.themeThumbnail,
                        themeName: theme.themeName,
                        _id: theme._id
                    }))

                    gameThemeContainer.innerHTML = mapCardComponent
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
            });
    });
};

loadingCardTheme();
loadingGameTheme();
