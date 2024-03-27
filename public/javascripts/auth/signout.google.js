import { auth } from "./firebase.config.js";
// @ts-ignore
import { signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", () => {
    signOut(auth).then((res) => {
        localStorage.removeItem("userData");
        document.cookie = '_id=; Max-Age=0';
        window.location.href = "/auth";
    });
});
