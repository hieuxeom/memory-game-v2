import { Toast } from "../utils/Toast.js";
const submitButton = document.getElementById("submitButton");
console.log(submitButton);
const themeName = document.getElementById("themeName");
const themeNameValid = document.getElementById("themeNameValid");
const cardFront = document.getElementById("cardFront");
const cardFrontValid = document.getElementById("cardFrontValid");
const cardBack = document.getElementById("cardBack");
const cardBackValid = document.getElementById("cardBackValid");
const isVip = document.getElementById("isVip");
const price = document.getElementById("price");
const status = document.getElementById("status");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!themeName.value) {
        return new Toast().error("Missing theme name");
    }
    if (!cardFront.files) {
        return new Toast().error("Missing theme front");
    }
    if (!cardBack.files) {
        return new Toast().error("Missing theme front");
    }
    const postData = new FormData();
    postData.append("themeName", themeName.value);
    postData.append("cardFront", cardFront.files ? cardFront.files[0] : "");
    postData.append("cardBack", cardBack.files ? cardBack.files[0] : "");
    postData.append("isVip", `${isVip.checked}`);
    postData.append("price", `${isVip.checked ? price.value : 0}`);
    const requestOptions = {
        method: "POST",
        body: postData,
    };
    fetch("/api/card-themes", requestOptions)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            // showMessage(status, res.message!, "success")
            const toast = new Toast(() => {
                window.location.href = "/admin/card-themes/all";
            });
            toast.success(res.message);
        }
        else {
            new Toast().error(res.message);
        }
    });
});
isVip.addEventListener("click", () => {
    price.disabled = !isVip.checked;
});
