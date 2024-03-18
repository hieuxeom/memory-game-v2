var userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : "";
var userAvatar = document.getElementById("userAvatar");
var displayNameValue = document.getElementById("displayName");
var gamePlayedValue = document.getElementById("gamePlayed");
var bestTimeValue = document.getElementById("bestTime");
var averageTimeValue = document.getElementById("averageTime");
var emailValue = document.getElementById("email");
function isIUser(userData) {
    return userData._id !== undefined;
}
if (isIUser(userData)) {
    var _id = userData._id;
    fetch("/api/users/".concat(_id))
        .then(function (res) { return res.json(); })
        .then(function (res) {
        var averageTime = res.averageTime, bestTime = res.bestTime, displayName = res.displayName, email = res.email, gamePlayed = res.gamePlayed, photoURL = res.photoURL;
        userAvatar.src = photoURL;
        displayNameValue.innerHTML = displayName;
        gamePlayedValue.innerHTML = gamePlayed.toString();
        bestTimeValue.innerHTML = bestTime.toString();
        averageTimeValue.innerHTML = averageTime.toString();
        emailValue.innerHTML = email;
    });
}
else {
    window.location.href = "/auth";
}
export {};
