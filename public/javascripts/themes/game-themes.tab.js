import { GameThemeCard } from "../utils/Card.js";
import { currentCardTheme, currentGameTheme } from "../utils/general.js";
import { getListVipGames } from "../utils/general.js";
const themeContainer = document.getElementById("themeContainer");
const searchBox = document.getElementById("searchBox");
const getListGameThemes = (search) => {
    const ownedVipGames = getListVipGames();
    return fetch(`/api/game-themes?${search ? (`_s=${search}`) : ""}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            let listGameThemes = res.data;
            let idSelected = currentGameTheme;
            listGameThemes = listGameThemes.filter((game) => {
                if (!game.isVip) {
                    return game;
                }
                if (game.isVip && ownedVipGames.includes(game._id)) {
                    return game;
                }
            });
            if (!currentCardTheme) {
                idSelected = listGameThemes[0]._id;
                localStorage.setItem("gameTheme", idSelected);
            }
            const mapCardComponent = listGameThemes.map((theme) => new GameThemeCard({
                themeThumbnail: theme.themeThumbnail,
                themeName: theme.themeName,
                _id: theme._id
            }));
            themeContainer.innerHTML = mapCardComponent
                .map((Card) => {
                return Card.render(idSelected === Card._id);
            })
                .join("");
            return mapCardComponent;
        }
        return [];
    })
        .then((mapCardComponent) => {
        mapCardComponent.forEach((game) => {
            game.setSelectEvent();
        });
    });
};
getListGameThemes();
searchBox.addEventListener("input", () => {
    getListGameThemes(searchBox.value);
});
