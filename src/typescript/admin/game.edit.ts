import {IGameThemeResponse} from "../type/gameTheme";
import {parseGameData} from "./game.utils.js";
import {IApiResponse} from "../type/response";

const gameThemeId: string = (document.getElementById("themeId") as HTMLInputElement)?.value ?? "";

const gameThemeName: HTMLInputElement = document.getElementById("themeName")! as HTMLInputElement;
const gameThemeData: HTMLTextAreaElement = document.getElementById("themeData")! as HTMLTextAreaElement;
const gameThumbnail: HTMLInputElement = document.getElementById("themeThumbnail")! as HTMLInputElement;
const listThemeTypes: NodeListOf<HTMLInputElement> = document.getElementsByName("themeDataType")! as NodeListOf<HTMLInputElement>;
const submitEditButton: HTMLButtonElement = document.getElementById("submitButton") as HTMLButtonElement;

const isVip: HTMLInputElement = document.getElementById("isVip") as HTMLInputElement;
const price: HTMLInputElement = document.getElementById("price") as HTMLInputElement
const onLoad = () => {
    fetch(`/api/game-themes/${gameThemeId}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === "success") {
                const {themeName, rawData, isVip: vipStatus, price: themePrice} = res.data;
                gameThemeName.value = themeName;
                gameThemeData.value = rawData;
                isVip.checked = vipStatus;
                price.value = themePrice
            }
        })
}

isVip.addEventListener("change", () => {
    console.log(isVip);
    price.disabled = !isVip.checked;
})

submitEditButton.addEventListener("click", (e) => {
    e.preventDefault();
    let themeDataType = null;

    listThemeTypes.forEach((e) => {
        if (e.checked) {
            themeDataType = e.value;
            return;
        }
    })

    const themeDataParsed = parseGameData(gameThemeData.value.split("\n"))

    const formData = new FormData();
    formData.append("themeId", gameThemeId)
    formData.append("themeName", gameThemeName.value)
    formData.append("themeThumbnail", gameThumbnail.files ? gameThumbnail.files[0] : "");
    formData.append("themeDataParsed", JSON.stringify(themeDataParsed))
    formData.append("rawData", gameThemeData.value)
    formData.append("themeDataType", themeDataType ?? "icon")

    fetch("/api/game-themes/", {
        method: "PUT",
        body: formData
    })
        .then((res) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === "redirect") {
                window.location.href = res.url!
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

onLoad()


