let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : "";
const userAvatar = document.getElementById("userAvatar");
const displayNameValue = document.getElementById("displayName");
const gamePlayedValue = document.getElementById("gamePlayed");
const bestTimeValue = document.getElementById("highestScore");
const averageTimeValue = document.getElementById("averageScore");
const emailValue = document.getElementById("email");
const mostPlayedSizeValue = document.getElementById("mostPlayedSize");
const mostPlayedTimeValue = document.getElementById("mostPlayedTime");
function isIUser(userData) {
    return userData._id !== undefined;
}
if (isIUser(userData)) {
    const { _id, provider } = userData;
    if (provider !== "credentials") {
        document.getElementById("changePassword").style.display = "none";
    }
    fetch(`/api/users/${_id}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            const { averageScore, highestScore, displayName, email, gamePlayed, photoURL, mostPlayedSize, mostPlayedTime } = res.data;
            userAvatar.src = photoURL;
            displayNameValue.innerHTML = displayName;
            gamePlayedValue.innerHTML = gamePlayed.toString();
            bestTimeValue.innerHTML = highestScore.toString();
            averageTimeValue.innerHTML = averageScore?.toFixed(2) ?? "-";
            emailValue.innerHTML = email;
            mostPlayedSizeValue.innerHTML = mostPlayedSize ?? "-";
            mostPlayedTimeValue.innerHTML = mostPlayedTime?.toString() ?? "-";
        }
    });
}
else {
    window.location.href = "/auth";
}
export {};
