import {IApiResponse} from "../type/response";
import {CardThemeCard} from "../utils/Card.js";
import {ICardThemeResponse} from "../type/cardTheme";
import {currentCardTheme} from "../type/general.js";
import {getListVipCards} from "./themes.index.js";

const themeContainer: HTMLElement = document.getElementById("themeContainer") as HTMLElement;
const searchBox: HTMLInputElement = document.getElementById("searchBox") as HTMLInputElement;

const getListCardThemes = async (search?: string) => {
    const ownedVipCards: string[] = getListVipCards();
    return fetch(`/api/card-themes?${search ? (`_s=${search}`) : ""}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse): CardThemeCard[] => {
            if (res.status === "success") {
                if (res.data) {
                    // const listCardThemes: ICardThemeResponse[] = res.data;
                    let listCardThemes: ICardThemeResponse[] = res.data;

                    listCardThemes = listCardThemes.filter((card) => {
                        if (!card.isVip) {
                            return card
                        }

                        if (card.isVip && ownedVipCards.includes(card._id)) {
                            return card
                        }

                    })
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

                    themeContainer.innerHTML = mapCardComponent
                        .map((card) => card.render(idSelected === card._id)).join("");

                    return mapCardComponent;
                } else {
                    themeContainer.innerHTML = ""
                }
            }
            return [];
        }).then((mapCardComponent: CardThemeCard[]) => {
            mapCardComponent.forEach((Card) => {
                Card.setSelectEvent()
            })
        })
        .catch((err) => {
            console.log(err);
            themeContainer.innerHTML = ""
        });

}

getListCardThemes();

searchBox.addEventListener("input", () => {
    getListCardThemes(searchBox.value);
})