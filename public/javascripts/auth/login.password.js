import { showMessage } from "../utils/handleMessage.js";
import { setCookie } from "../utils/cookies.js";
const uEmailLogin = document.getElementById("uEmail");
const uPasswordLogin = document.getElementById("uPassword");
const messageElement = document.getElementById("showMessage");
const submitLogin = document.getElementById("submitLogin");
submitLogin.addEventListener("click", () => {
    let postData = {
        uEmail: uEmailLogin.value,
        uPassword: uPasswordLogin.value,
    };
    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            let { userData } = res.data;
            localStorage.setItem("userData", JSON.stringify(userData));
            setCookie("_id", userData._id);
            window.location.href = "/user";
        }
        else {
            showMessage(messageElement, res?.message);
        }
    });
});
