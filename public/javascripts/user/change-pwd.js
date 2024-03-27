import { hideMessage, showMessage } from "../utils/handleMessage.js";
import { passWordRegex } from "../utils/regex.js";
const uOldPassword = document.getElementById("uOldPassword");
const uOldPasswordValid = document.getElementById("uOldPasswordValid");
const uNewPassword = document.getElementById("uNewPassword");
const uNewPasswordValid = document.getElementById("uNewPasswordValid");
const uReNewPassword = document.getElementById("uReNewPassword");
const uReNewPasswordValid = document.getElementById("uReNewPasswordValid");
const messageElement = document.getElementById("showMessage");
const submitChangePwd = document.getElementById("submitChangePwd");
const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
const handleCheckValid = () => {
    if (!uOldPassword.value) {
        showMessage(uOldPasswordValid, "Please enter your old password");
        return false;
    }
    else {
        hideMessage(uOldPasswordValid);
    }
    if (!uNewPassword.value) {
        showMessage(uNewPasswordValid, "Please enter your new password");
        return false;
    }
    else if (!passWordRegex.test(uNewPassword.value)) {
        showMessage(uNewPasswordValid, "Password must be at least 6 characters and contain: uppercase letters, lowercase letters and numbers");
        return false;
    }
    else {
        hideMessage(uNewPasswordValid);
    }
    if (uReNewPassword.value !== uNewPassword.value) {
        showMessage(uReNewPasswordValid, "Password doesn't match");
        return false;
    }
    else {
        hideMessage(uReNewPasswordValid);
    }
    return true;
};
const handleChangePwd = () => {
    if (userData) {
        const { _id } = userData;
        if (uNewPassword.value === uReNewPassword.value) {
            let postData = {
                _id,
                oldPwd: uOldPassword.value,
                newPwd: uNewPassword.value
            };
            fetch("/api/auth/change-pwd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            })
                .then((res) => res.json())
                .then((res) => {
                if (res.status === "success") {
                    showMessage(messageElement, res?.message ?? "", "success");
                    setTimeout(() => hideMessage(messageElement), 1500);
                }
                else {
                    showMessage(messageElement, res?.message ?? "");
                }
            });
        }
    }
};
submitChangePwd.addEventListener("click", e => {
    e.preventDefault();
    if (handleCheckValid()) {
        handleChangePwd();
    }
});
