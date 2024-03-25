import { parseGameData } from "./game.utils.js";
const submitGameThemeButton = document.getElementById("submitButton");
const gameThemeName = document.getElementById("themeName");
const gameThemeData = document.getElementById("themeData");
const gameThumbnail = document.getElementById("themeThumbnail");
const listThemeTypes = document.getElementsByName("themeDataType");
submitGameThemeButton.addEventListener("click", (e) => {
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
    formData.append("themeName", gameThemeName.value);
    formData.append("themeThumbnail", gameThumbnail.files ? gameThumbnail.files[0] : "");
    formData.append("themeDataParsed", JSON.stringify(themeDataParsed));
    formData.append("rawData", gameThemeData.value);
    formData.append("themeDataType", themeDataType ?? "icon");
    fetch("/api/game-themes", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
        if (response.url) {
            return window.location.href = response.url;
        }
        else {
            return response.json();
        }
    })
        .then((data) => {
        console.log("Response from server:", data);
    })
        .catch((error) => {
        console.error("Error:", error);
    });
});
