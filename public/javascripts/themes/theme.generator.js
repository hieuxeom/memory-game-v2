import { currentCardTheme, currentGameTheme } from "../type/general.js";
import { CardThemeCard, GameThemeCard } from "../utils/Card.js";
const cardThemeContainer = document.getElementById("cardThemeContainer");
const gameThemeContainer = document.getElementById("gameThemeContainer");
const loadingCardTheme = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/card-themes")
            .then((res) => res.json())
            .then((listCardThemes) => {
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
            cardThemeContainer.innerHTML = mapCardComponent
                .map((card) => card.render(idSelected === card._id)).join("");
            return mapCardComponent;
        }).then((mapCardComponent) => {
            mapCardComponent.forEach((Card) => {
                Card.setSelectEvent();
            });
        });
    });
};
const loadingGameTheme = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/game-themes")
            .then((res) => res.json())
            .then((listGameThemes) => {
            let idSelected = currentGameTheme;
            if (!currentCardTheme) {
                idSelected = listGameThemes[0]._id;
                localStorage.setItem("gameTheme", idSelected);
            }
            const mapCardComponent = listGameThemes.map((theme) => new GameThemeCard({
                themeThumbnail: theme.themeThumbnail,
                themeName: theme.themeName,
                _id: theme._id
            }));
            gameThemeContainer.innerHTML = mapCardComponent
                .map((Card) => {
                return Card.render(idSelected === Card._id);
            })
                .join("");
            return mapCardComponent;
        })
            .then((mapCardComponent) => {
            mapCardComponent.forEach((game) => {
                game.setSelectEvent();
            });
        });
    });
};
loadingCardTheme();
loadingGameTheme();
