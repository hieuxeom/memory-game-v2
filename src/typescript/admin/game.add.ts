import {IGameData} from "../type/gameTheme";
import * as events from "events";
import {parseGameData} from "./game.utils.js";

const submitGameThemeButton: HTMLButtonElement = document.getElementById("submitButton")! as HTMLButtonElement;
const gameThemeName: HTMLInputElement = document.getElementById("themeName")! as HTMLInputElement;
const gameThemeData: HTMLTextAreaElement = document.getElementById("themeData")! as HTMLTextAreaElement;
const gameThumbnail: HTMLInputElement = document.getElementById("themeThumbnail")! as HTMLInputElement;
const listThemeTypes: NodeListOf<HTMLInputElement> = document.getElementsByName("themeDataType")! as NodeListOf<HTMLInputElement>;



submitGameThemeButton.addEventListener("click", (e) => {
    e.preventDefault();
    let themeDataType = null;

    listThemeTypes.forEach((e) => {
        if (e.checked) {
            themeDataType = e.value;
            return;
        }
    })

    const themeDataParsed = parseGameData(gameThemeData.value.split("\n"))

    const formData: FormData = new FormData();

    formData.append("themeName", gameThemeName.value)
    formData.append("themeThumbnail", gameThumbnail.files ? gameThumbnail.files[0] : "");
    formData.append("themeDataParsed", JSON.stringify(themeDataParsed))
    formData.append("rawData", gameThemeData.value)
    formData.append("themeDataType", themeDataType ?? "icon")

    fetch("/api/game-themes", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (response.url) {
                return window.location.href = response.url
            } else {
                return response.json()
            }
        })
        .then((data) => {
            console.log("Response from server:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
