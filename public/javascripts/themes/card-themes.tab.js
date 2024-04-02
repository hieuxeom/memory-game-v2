import { CardThemeCard } from "../utils/Card.js";
import { currentCardTheme } from "../type/general.js";
import { getListVipCards } from "./themes.index.js";
const themeContainer = document.getElementById("themeContainer");
const searchBox = document.getElementById("searchBox");
const getListCardThemes = async (search) => {
    const ownedVipCards = getListVipCards();
    return fetch(`/api/card-themes?${search ? (`_s=${search}`) : ""}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            if (res.data) {
                // const listCardThemes: ICardThemeResponse[] = res.data;
                let listCardThemes = res.data;
                listCardThemes = listCardThemes.filter((card) => {
                    if (!card.isVip) {
                        return card;
                    }
                    if (card.isVip && ownedVipCards.includes(card._id)) {
                        return card;
                    }
                });
                let idSelected = currentCardTheme;
                if (!currentCardTheme) {
                    idSelected = listCardThemes[0]._id;
                    localStorage.setItem("cardTheme", idSelected);
                }
                const mapCardComponent = listCardThemes
                    .map((theme) => {
                    return new CardThemeCard({
                        _id: theme._id,
                        cardBack: theme.cardBack,
                        themeName: theme.themeName
                    });
                });
                themeContainer.innerHTML = mapCardComponent
                    .map((card) => card.render(idSelected === card._id)).join("");
                return mapCardComponent;
            }
            else {
                themeContainer.innerHTML = "";
            }
        }
        return [];
    }).then((mapCardComponent) => {
        mapCardComponent.forEach((Card) => {
            Card.setSelectEvent();
        });
    })
        .catch((err) => {
        console.log(err);
        themeContainer.innerHTML = "";
    });
};
getListCardThemes();
searchBox.addEventListener("input", () => {
    getListCardThemes(searchBox.value);
});
