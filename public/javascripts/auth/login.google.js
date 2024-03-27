// @ts-ignore
import { auth, provider } from "./firebase.config.js";
// @ts-ignore
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
const loginWithGoogle = document.getElementById("loginWithGoogle");
const userData = localStorage.getItem("userData") ?? "";
if (userData) {
    window.location.href = "/user";
}
loginWithGoogle.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const userData = {
            displayName,
            email,
            photoURL,
            password: "none",
            provider: "google",
        };
        fetch("/api/googleSignIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((user) => {
            localStorage.setItem("userData", JSON.stringify(user));
            window.location.href = "/user";
        });
    })
        .catch((error) => {
        console.log(error);
    });
});
