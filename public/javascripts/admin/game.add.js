"use strict";
var submitGameThemeButton = document.getElementById("submitButton");
var gameThemeName = document.getElementById("themeName");
var gameThemeData = document.getElementById("themeData");
submitGameThemeButton.addEventListener("click", function (e) {
    e.preventDefault();
    var parseGameData = gameThemeData.value.split("\n");
    var mapGameData = parseGameData.map(function (value) {
        var temp = value.split("|");
        if (temp.length > 1) {
            return {
                icon: temp[0],
                value: temp[1],
                type: "icon",
            };
        }
        else {
            return {
                icon: temp[0],
                value: temp[0],
                type: "icon",
            };
        }
    });
    var dataToSend = {
        themeName: themeName.value,
        themeData: mapGameData,
    };
    fetch("/api/game-themes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log("Response from server:", data);
    })
        .catch(function (error) {
        console.error("Error:", error);
    });
});
