import {showMessage} from "../utils/handleMessage.js";

const uEmailLogin = document.getElementById("uEmail") as HTMLInputElement;
const uPasswordLogin = document.getElementById("uPassword") as HTMLInputElement;
const messageElement = document.getElementById("showMessage") as HTMLElement;
const submitLogin = document.getElementById("submitLogin") as HTMLButtonElement;

const handleLogin = () => {
    let postData = {
        uEmail: uEmailLogin.value,
        uPassword: uPasswordLogin.value,
    }

    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem("userData", JSON.stringify(res.userData));
                window.location.href = "/user";
            } else {
                showMessage(messageElement, res.description);
            }
        })
}

submitLogin.addEventListener("click", handleLogin)