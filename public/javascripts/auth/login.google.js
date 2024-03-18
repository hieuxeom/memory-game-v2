// @ts-ignore
var _a;
import { auth, provider } from "./firebase.config.js";
// @ts-ignore
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
var loginWithGoogle = document.getElementById("loginWithGoogle");
var userData = (_a = localStorage.getItem("userData")) !== null && _a !== void 0 ? _a : "";
if (userData) {
    window.location.href = "/user";
}
loginWithGoogle.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then(function (result) {
        var _a = result.user, displayName = _a.displayName, email = _a.email, photoURL = _a.photoURL;
        var userData = {
            displayName: displayName,
            email: email,
            photoURL: photoURL,
            provider: "google",
        };
        fetch("/api/googleSignIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then(function (res) { return res.json(); })
            .then(function (user) {
            localStorage.setItem("userData", JSON.stringify(user));
            window.location.href = "/user";
        });
    })
        .catch(function (error) {
        console.log(error);
    });
});
