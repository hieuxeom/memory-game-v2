"use strict";
var submitButton = document.getElementById("submitButton");
var themeId = document.getElementsByName("themeId")[0];
var themeName = document.getElementsByName("themeName")[0];
var cardFront = document.getElementsByName("themeFront")[0];
var cardBack = document.getElementsByName("themeBack")[0];
// formData.append("themeName");
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append("themeId", themeId.value);
    formData.append("themeName", themeName.value);
    formData.append("themeFront", cardFront.files ? cardFront.files[0] : "");
    formData.append("themeBack", cardBack.files ? cardBack.files[0] : "");
    var requestOptions = {
        method: "PUT",
        body: formData,
    };
    fetch("/api/card-themes", requestOptions).then(function (res) {
        if (res.url) {
            window.location.href = res.url;
        }
    });
});
