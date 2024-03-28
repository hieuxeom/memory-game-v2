import { auth, provider } from "./firebase.config.js";
// @ts-ignore
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { setCookie } from "../utils/cookies.js";
const loginWithGoogle = document.getElementById("loginWithGoogle");
const userData = localStorage.getItem("userData") ?? "";
if (userData) {
    window.location.href = "/user";
}
loginWithGoogle.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const postData = {
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
            body: JSON.stringify(postData),
        })
            .then((res) => {
            if (res.status !== 400) {
                return res.json();
            }
            else {
                return null;
            }
        })
            .then((res) => {
            if (res && res.status === "success") {
                let { userData } = res.data;
                localStorage.setItem("userData", JSON.stringify(userData));
                setCookie("_id", userData._id);
                window.location.href = "/user";
            }
        });
    })
        .catch((error) => {
        console.log(error);
    });
});
