var userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : "";
var userAvatar = document.getElementById("userAvatar");
var displayNameValue = document.getElementById("displayName");
var gamePlayedValue = document.getElementById("gamePlayed");
var bestTimeValue = document.getElementById("highestScore");
var averageTimeValue = document.getElementById("averageScore");
var emailValue = document.getElementById("email");
var mostPlayedSizeValue = document.getElementById("mostPlayedSize");
var mostPlayedTimeValue = document.getElementById("mostPlayedTime");
function isIUser(userData) {
    return userData._id !== undefined;
}
if (isIUser(userData)) {
    var _id = userData._id;
    fetch("/api/users/".concat(_id))
        .then(function (res) { return res.json(); })
        .then(function (res) {
        var averageScore = res.averageScore, highestScore = res.highestScore, displayName = res.displayName, email = res.email, gamePlayed = res.gamePlayed, photoURL = res.photoURL, mostPlayedSize = res.mostPlayedSize, mostPlayedTime = res.mostPlayedTime;
        userAvatar.src = photoURL;
        displayNameValue.innerHTML = displayName;
        gamePlayedValue.innerHTML = gamePlayed.toString();
        bestTimeValue.innerHTML = highestScore.toString();
        averageTimeValue.innerHTML = averageScore.toFixed(2);
        emailValue.innerHTML = email;
        mostPlayedSizeValue.innerHTML = mostPlayedSize;
        mostPlayedTimeValue.innerHTML = mostPlayedTime.toString();
    });
}
else {
    window.location.href = "/auth";
}
export {};
