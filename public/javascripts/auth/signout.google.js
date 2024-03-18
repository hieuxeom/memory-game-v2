import { auth } from "./firebase.config.js";
// @ts-ignore
import { signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
var signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", function () {
    signOut(auth).then(function (res) {
        localStorage.removeItem("userData");
        window.location.href = "/auth";
    });
});
