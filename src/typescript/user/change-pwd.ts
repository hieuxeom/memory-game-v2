import {hideMessage, showMessage} from "../utils/handleMessage.js";
import {IUser} from "../type/user";
import {passWordRegex} from "../utils/regex.js";

const uOldPassword: HTMLInputElement = document.getElementById("uOldPassword") as HTMLInputElement;
const uOldPasswordValid: HTMLElement = document.getElementById("uOldPasswordValid") as HTMLElement;

const uNewPassword: HTMLInputElement = document.getElementById("uNewPassword") as HTMLInputElement;
const uNewPasswordValid: HTMLElement = document.getElementById("uNewPasswordValid") as HTMLElement;

const uReNewPassword: HTMLInputElement = document.getElementById("uReNewPassword") as HTMLInputElement;
const uReNewPasswordValid: HTMLElement = document.getElementById("uReNewPasswordValid") as HTMLElement;

const messageElement = document.getElementById("showMessage") as HTMLElement;
const submitChangePwd = document.getElementById("submitChangePwd") as HTMLButtonElement;
const userData: IUser | null = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) as IUser : null

const handleCheckValid = () => {
    if (!uOldPassword.value) {
        showMessage(uOldPasswordValid, "Please enter your old password");
        return false
    } else {
        hideMessage(uOldPasswordValid)
    }

    if (!uNewPassword.value) {
        showMessage(uNewPasswordValid, "Please enter your new password");
        return false
    } else if (!passWordRegex.test(uNewPassword.value)) {
        showMessage(uNewPasswordValid, "Password must be at least 6 characters and contain: uppercase letters, lowercase letters and numbers")
        return false
    } else {
        hideMessage(uNewPasswordValid)
    }

    if (uReNewPassword.value !== uNewPassword.value) {
        showMessage(uReNewPasswordValid, "Password doesn't match");
        return false
    } else {
        hideMessage(uReNewPasswordValid)
    }

    return true
}
const handleChangePwd = () => {
    if (userData) {
        const {_id} = userData;
        if (uNewPassword.value === uReNewPassword.value) {

            let postData = {
                _id,
                oldPwd: uOldPassword.value,
                newPwd: uNewPassword.value
            }

            fetch("/api/auth/change-pwd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        showMessage(messageElement, res.description, "success");
                        setTimeout(() => hideMessage(messageElement), 1500)
                    } else {
                        showMessage(messageElement, res.description);
                    }
                })
        }
    }

}

submitChangePwd.addEventListener("click", e => {
    e.preventDefault();
    if (handleCheckValid()) {
        handleChangePwd()
    }
});