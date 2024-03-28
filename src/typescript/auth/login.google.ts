import {auth, provider} from "./firebase.config.js";
// @ts-ignore
import {signInWithPopup, OAuthCredential} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {IApiResponse} from "../type/response";
import {setCookie} from "../utils/cookies.js";

const loginWithGoogle: HTMLElement = document.getElementById("loginWithGoogle") as HTMLElement;
const userData: string = localStorage.getItem("userData") ?? "";

if (userData) {
    window.location.href = "/user";
}

loginWithGoogle.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result: OAuthCredential) => {
            const {displayName, email, photoURL} = result.user;

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
                .then((res: Response) => {
                    if (res.status !== 400) {
                        return res.json()
                    } else {
                        return null
                    }
                })
                .then((res: IApiResponse | null) => {
                    if (res && res.status === "success") {

                        let {userData} = res.data;

                        localStorage.setItem("userData", JSON.stringify(userData));

                        setCookie("_id", userData._id);

                        window.location.href = "/user";
                    }
                })
            ;
        })
        .catch((error: OAuthCredential) => {
            console.log(error);
        });
});
