import { auth } from "./firebase.config.js";
// @ts-ignore
import { signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { deleteCookie } from "../utils/cookies.js";
const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", () => {
    signOut(auth).then((res) => {
        localStorage.removeItem("userData");
        deleteCookie("_id");
        window.location.href = "/auth";
    });
});
