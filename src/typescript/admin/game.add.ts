import {IGameData} from "../type/gameTheme";
import * as events from "events";
import {parseGameData} from "./game.utils.js";
import {IApiResponse} from "../type/response";

const submitGameThemeButton: HTMLButtonElement = document.getElementById("submitButton")! as HTMLButtonElement;
const gameThemeName: HTMLInputElement = document.getElementById("themeName")! as HTMLInputElement;
const gameThemeData: HTMLTextAreaElement = document.getElementById("themeData")! as HTMLTextAreaElement;
const gameThumbnail: HTMLInputElement = document.getElementById("themeThumbnail")! as HTMLInputElement;
const listThemeTypes: NodeListOf<HTMLInputElement> = document.getElementsByName("themeDataType")! as NodeListOf<HTMLInputElement>;
const isVip: HTMLInputElement = document.getElementById("isVip") as HTMLInputElement;
const price: HTMLInputElement = document.getElementById("price") as HTMLInputElement;

isVip.addEventListener("change", () => {
    console.log(isVip);
    price.disabled = !isVip.checked;
})

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

    const postData: FormData = new FormData();

    postData.append("themeName", gameThemeName.value)
    postData.append("themeThumbnail", gameThumbnail.files ? gameThumbnail.files[0] : "");
    postData.append("themeDataParsed", JSON.stringify(themeDataParsed))
    postData.append("rawData", gameThemeData.value)
    postData.append("themeDataType", themeDataType ?? "icon")
    postData.append("isVip", `${isVip.checked}`);
    postData.append("price", `${isVip.checked ? price.value : 0}`);


    fetch("/api/game-themes", {
        method: "POST",
        body: postData,
    })
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === "success") {
                // show status message
                setTimeout(() => window.location.href = "/admin/game-themes/all", 1500)
            } else {
                // show error message
                console.log(res.error);
            }
        })

});
