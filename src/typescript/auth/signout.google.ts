import {auth, provider} from "./firebase.config.js";
// @ts-ignore
import {signOut} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {deleteCookie} from "../utils/cookies.js";

const signOutButton: HTMLButtonElement = document.getElementById("signOutButton") as HTMLButtonElement;

signOutButton.addEventListener("click", () => {
    signOut(auth).then((res: any) => {
        localStorage.removeItem("userData");
        deleteCookie("_id")
        window.location.href = "/auth";
    });
});
