import {IApiResponse} from "../type/response";
import {Toast} from "../utils/Toast.js";

const submitButton: HTMLButtonElement = document.getElementById("submitButton") as HTMLButtonElement;

console.log(submitButton);

const themeId: HTMLInputElement = document.getElementById("themeId") as HTMLInputElement;
const themeName: HTMLInputElement = document.getElementById("themeName") as HTMLInputElement;
const cardFront: HTMLInputElement = document.getElementById("cardFront") as HTMLInputElement;
const cardBack: HTMLInputElement = document.getElementById("cardBack") as HTMLInputElement;
const isVip: HTMLInputElement = document.getElementById("isVip") as HTMLInputElement;
const price: HTMLInputElement = document.getElementById("price") as HTMLInputElement;
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (!themeId.value) {
        return new Toast().error("Missing themeId")
    }

    const editData: FormData = new FormData();
    editData.append("themeId", themeId.value);
    editData.append("themeName", themeName.value);
    editData.append("cardFront", cardFront.files ? cardFront.files[0] : "");
    editData.append("cardBack", cardBack.files ? cardBack.files[0] : "");
    editData.append("isVip", `${isVip.checked}`);
    editData.append("price", `${isVip.checked ? price.value : 0}`);

    const requestOptions = {
        method: "PUT",
        body: editData,
    };

    fetch("/api/card-themes", requestOptions).then((res: Response) => res.json()).then((res: IApiResponse) => {
        if (res.status === "redirect") {
            const toast = new Toast(() => {
                window.location.href = res.url!
            })

            toast.success(res.message!)
        } else {
            console.log(res)
        }
    });
});

isVip.addEventListener("click", () => {
    price.disabled = !isVip.checked;
})

