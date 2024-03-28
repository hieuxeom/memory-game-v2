import { parseGameData } from "./game.utils.js";
const gameThemeId = document.getElementById("themeId")?.value ?? "";
const gameThemeName = document.getElementById("themeName");
const gameThemeData = document.getElementById("themeData");
const gameThumbnail = document.getElementById("themeThumbnail");
const listThemeTypes = document.getElementsByName("themeDataType");
const submitEditButton = document.getElementById("submitButton");
const onLoad = () => {
    fetch(`/api/game-themes/${gameThemeId}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            const { themeName, rawData } = res.data;
            gameThemeName.value = themeName;
            gameThemeData.value = rawData;
        }
    });
};
submitEditButton.addEventListener("click", (e) => {
    e.preventDefault();
    let themeDataType = null;
    listThemeTypes.forEach((e) => {
        if (e.checked) {
            themeDataType = e.value;
            return;
        }
    });
    const themeDataParsed = parseGameData(gameThemeData.value.split("\n"));
    const formData = new FormData();
    formData.append("themeId", gameThemeId);
    formData.append("themeName", gameThemeName.value);
    formData.append("themeThumbnail", gameThumbnail.files ? gameThumbnail.files[0] : "");
    formData.append("themeDataParsed", JSON.stringify(themeDataParsed));
    formData.append("rawData", gameThemeData.value);
    formData.append("themeDataType", themeDataType ?? "icon");
    fetch("/api/game-themes/", {
        method: "PUT",
        body: formData
    }).then((res) => {
        if (res.url) {
            return window.location.href = res.url;
        }
    }).catch((err) => {
        console.log(err);
    });
});
onLoad();
