import { parseGameData } from "./game.utils.js";
const submitGameThemeButton = document.getElementById("submitButton");
const gameThemeName = document.getElementById("themeName");
const gameThemeData = document.getElementById("themeData");
const gameThumbnail = document.getElementById("themeThumbnail");
const listThemeTypes = document.getElementsByName("themeDataType");
const isVip = document.getElementById("isVip");
const price = document.getElementById("price");
isVip.addEventListener("change", () => {
    console.log(isVip);
    price.disabled = !isVip.checked;
});
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
    const postData = new FormData();
    postData.append("themeName", gameThemeName.value);
    postData.append("themeThumbnail", gameThumbnail.files ? gameThumbnail.files[0] : "");
    postData.append("themeDataParsed", JSON.stringify(themeDataParsed));
    postData.append("rawData", gameThemeData.value);
    postData.append("themeDataType", themeDataType ?? "icon");
    postData.append("isVip", `${isVip.checked}`);
    postData.append("price", `${isVip.checked ? price.value : 0}`);
    fetch("/api/game-themes", {
        method: "POST",
        body: postData,
    })
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            // show status message
            setTimeout(() => window.location.href = "/admin/game-themes/all", 1500);
        }
        else {
            // show error message
            console.log(res.error);
        }
    });
});
