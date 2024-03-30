import {IApiResponse} from "../type/response";

const submitButton: HTMLButtonElement = document.getElementById("submitButton") as HTMLButtonElement;

console.log(submitButton);

const themeId: HTMLInputElement = document.getElementById("themeId") as HTMLInputElement;
const themeName: HTMLInputElement = document.getElementById("themeName") as HTMLInputElement;
const cardFront: HTMLInputElement = document.getElementById("cardFront") as HTMLInputElement;
const cardBack: HTMLInputElement = document.getElementById("cardBack") as HTMLInputElement;
const isVip: HTMLInputElement = document.getElementById("isVip") as HTMLInputElement;
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const editData: FormData = new FormData();
    editData.append("themeId", themeId.value);
    editData.append("themeName", themeName.value);
    editData.append("cardFront", cardFront.files ? cardFront.files[0] : "");
    editData.append("cardBack", cardBack.files ? cardBack.files[0] : "");
    editData.append("isVip", `${isVip.checked}`);

    const requestOptions = {
        method: "PUT",
        body: editData,
    };

    fetch("/api/card-themes", requestOptions).then((res: Response) => res.json()).then((res: IApiResponse) => {
        if (res.status === "redirect") {
            window.location.href = res.url!
        } else {
            console.log(res)
        }
    });
});
