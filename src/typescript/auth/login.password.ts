import {showMessage} from "../utils/handleMessage.js";
import {IApiResponse} from "../type/response";
import {setCookie} from "../utils/cookies.js";
import {IUser} from "../type/user";

const uEmailLogin = document.getElementById("uEmail") as HTMLInputElement;
const uPasswordLogin = document.getElementById("uPassword") as HTMLInputElement;
const messageElement = document.getElementById("showMessage") as HTMLElement;
const submitLogin = document.getElementById("submitLogin") as HTMLButtonElement;

submitLogin.addEventListener("click", () => {
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
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === "success") {
                let {userData} = res.data;

                localStorage.setItem("userData", JSON.stringify(userData));

                setCookie("_id", userData._id)

                window.location.href = "/user";
            } else {
                showMessage(messageElement, res?.message!);
            }
        })
})