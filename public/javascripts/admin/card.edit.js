"use strict";
const submitButton = document.getElementById("submitButton");
const themeId = document.getElementsByName("themeId")[0];
const themeName = document.getElementsByName("themeName")[0];
const cardFront = document.getElementsByName("themeFront")[0];
const cardBack = document.getElementsByName("themeBack")[0];
// formData.append("themeName");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("themeId", themeId.value);
    formData.append("themeName", themeName.value);
    formData.append("themeFront", cardFront.files ? cardFront.files[0] : "");
    formData.append("themeBack", cardBack.files ? cardBack.files[0] : "");
    const requestOptions = {
        method: "PUT",
        body: formData,
    };
    fetch("/api/card-themes", requestOptions).then((res) => {
        if (res.url) {
            window.location.href = res.url;
        }
    });
});
