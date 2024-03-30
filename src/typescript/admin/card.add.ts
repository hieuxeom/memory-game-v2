import {IApiResponse} from "../type/response";
import {showMessage} from "../utils/handleMessage.js";

const submitButton: HTMLButtonElement = document.getElementById("submitButton") as HTMLButtonElement;

console.log(submitButton);

const themeName: HTMLInputElement = document.getElementById("themeName") as HTMLInputElement;
const themeNameValid: HTMLElement = document.getElementById("themeNameValid") as HTMLElement;

const cardFront: HTMLInputElement = document.getElementById("cardFront") as HTMLInputElement;
const cardFrontValid: HTMLElement = document.getElementById("cardFrontValid") as HTMLElement;

const cardBack: HTMLInputElement = document.getElementById("cardBack") as HTMLInputElement;
const cardBackValid: HTMLElement = document.getElementById("cardBackValid") as HTMLElement;

const isVip: HTMLInputElement = document.getElementById("isVip") as HTMLInputElement;
const status: HTMLElement = document.getElementById("status") as HTMLElement;
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const postData: FormData = new FormData();
    postData.append("themeName", themeName.value);
    postData.append("cardFront", cardFront.files ? cardFront.files[0] : "");
    postData.append("cardBack", cardBack.files ? cardBack.files[0] : "");
    postData.append("isVip", `${isVip.checked}`);

    const requestOptions = {
        method: "POST",
        body: postData,
    };

    fetch("/api/card-themes", requestOptions)
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === "success") {
                showMessage(status, res.message!, "success")
                setTimeout(() => window.location.href = "/admin/card-themes/all", 1500)
            } else {
                showMessage(status, res.message!)
            }
        })
})
;
