import { FetchHelpers } from "../utils/fetch.js";
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
    // fetch(`/api/users/${_id}`)
    // 	.then((res) => res.json())
    // 	.then((res: IUser) => {
    // 		const { averageTime, bestTime, displayName, email, gamePlayed, photoURL } = res;
    // 		userAvatar.src = photoURL;
    // 		displayNameValue.innerHTML = displayName;
    // 		gamePlayedValue.innerHTML = gamePlayed.toString();
    // 		bestTimeValue.innerHTML = bestTime.toString();
    // 		// averageTimeValue.innerHTML = averageTime.toString();
    // 		averageTimeValue.innerHTML = averageTime.toFixed(2);
    // 		emailValue.innerHTML = email;
    // 	});
    var fetcher = new FetchHelpers("/api/users/".concat(_id));
    fetcher.get().then(function (res) {
        console.log(res);
    });
}
else {
    window.location.href = "/auth";
}
