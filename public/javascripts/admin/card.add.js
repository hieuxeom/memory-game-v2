import { showMessage } from "../utils/handleMessage.js";
const submitButton = document.getElementById("submitButton");
console.log(submitButton);
const themeName = document.getElementById("themeName");
const themeNameValid = document.getElementById("themeNameValid");
const cardFront = document.getElementById("cardFront");
const cardFrontValid = document.getElementById("cardFrontValid");
const cardBack = document.getElementById("cardBack");
const cardBackValid = document.getElementById("cardBackValid");
const isVip = document.getElementById("isVip");
const status = document.getElementById("status");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const postData = new FormData();
    postData.append("themeName", themeName.value);
    postData.append("cardFront", cardFront.files ? cardFront.files[0] : "");
    postData.append("cardBack", cardBack.files ? cardBack.files[0] : "");
    postData.append("isVip", `${isVip.checked}`);
    const requestOptions = {
        method: "POST",
        body: postData,
    };
    fetch("/api/card-themes", requestOptions)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            showMessage(status, res.message, "success");
            setTimeout(() => window.location.href = "/admin/card-themes/all", 1500);
        }
        else {
            showMessage(status, res.message);
        }
    });
});
