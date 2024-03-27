// @ts-ignore

import { auth, provider } from "./firebase.config.js";
// @ts-ignore
import { signInWithPopup, OAuthCredential } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const loginWithGoogle: HTMLElement = document.getElementById("loginWithGoogle") as HTMLElement;
const userData: string = localStorage.getItem("userData") ?? "";

if (userData) {
	window.location.href = "/user";
}

loginWithGoogle.addEventListener("click", () => {
	signInWithPopup(auth, provider)
		.then((result: OAuthCredential) => {
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
				.then((res: any) => res.json())
				.then((user: any) => {
					localStorage.setItem("userData", JSON.stringify(user));
					window.location.href = "/user";
				});
		})
		.catch((error: OAuthCredential) => {
			console.log(error);
		});
});
