var submitGameThemeButton = document.getElementById("submitButton");
var gameThemeName = document.getElementById("themeName");
var gameThemeData = document.getElementById("themeData");
var gameThumbnail = document.getElementById("themeThumbnail");
var listThemeTypes = document.getElementsByName("themeDataType");
submitGameThemeButton.addEventListener("click", function (e) {
    e.preventDefault();
    var themeDataType = null;
    listThemeTypes.forEach(function (e) {
        if (e.checked) {
            themeDataType = e.value;
            return;
        }
    });
    var parseGameData = gameThemeData.value.split("\n");
    var themeDataParsed = parseGameData.map(function (value) {
        var tempString = value.split("|");
        if (tempString.length > 1) {
            return {
                icon: tempString[0],
                value: tempString[1],
            };
        }
        else {
            return {
                icon: tempString[0],
                value: tempString[0],
            };
        }
    });
    var formData = new FormData();
    formData.append("themeName", gameThemeName.value);
    formData.append("themeThumbnail", gameThumbnail.files ? gameThumbnail.files[0] : "");
    formData.append("themeDataParsed", JSON.stringify(themeDataParsed));
    formData.append("rawData", gameThemeData.value);
    formData.append("themeDataType", themeDataType !== null && themeDataType !== void 0 ? themeDataType : "icon");
    fetch("/api/game-themes", {
        method: "POST",
        body: formData,
    })
        .then(function (response) {
        if (response.url) {
            return window.location.href = response.url;
        }
        else {
            return response.json();
        }
    })
        .then(function (data) {
        console.log("Response from server:", data);
    })
        .catch(function (error) {
        console.error("Error:", error);
    });
});
export {};
