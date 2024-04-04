import { Toast } from "../utils/Toast.js";
const submitButton = document.getElementById("submitButton");
console.log(submitButton);
const themeId = document.getElementById("themeId");
const themeName = document.getElementById("themeName");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");
const isVip = document.getElementById("isVip");
const price = document.getElementById("price");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!themeId.value) {
        return new Toast().error("Missing themeId");
    }
    const editData = new FormData();
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
    fetch("/api/card-themes", requestOptions).then((res) => res.json()).then((res) => {
        if (res.status === "redirect") {
            const toast = new Toast(() => {
                window.location.href = res.url;
            });
            toast.success(res.message);
        }
        else {
            console.log(res);
        }
    });
});
isVip.addEventListener("click", () => {
    price.disabled = !isVip.checked;
});
