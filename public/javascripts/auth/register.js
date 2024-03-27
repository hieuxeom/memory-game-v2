import { showMessage } from "../utils/handleMessage.js";
import { emailRegex, passWordRegex } from "../utils/regex.js";
const uDisplayName = document.getElementById("uDisplayName");
const uDisplayNameValid = document.getElementById("uDisplayNameValid");
const uEmail = document.getElementById("uEmail");
const uEmailValid = document.getElementById("uEmailValid");
const uPassword = document.getElementById("uPassword");
const uPasswordValid = document.getElementById("uPasswordValid");
const uRePassword = document.getElementById("uRePassword");
const uRePasswordValid = document.getElementById("uRePasswordValid");
const submitRegister = document.getElementById("submitRegister");
const messageElement = document.getElementById("showMessage");
const handleCheckValid = () => {
    if (!uDisplayName.value) {
        showMessage(uDisplayNameValid, "This field is required");
        return false;
    }
    else {
        uDisplayNameValid.classList.add("hidden");
    }
    if (!uEmail.value) {
        showMessage(uEmailValid, "This field is required");
        return false;
    }
    else if (!emailRegex.test(uEmail.value)) {
        showMessage(uEmailValid, "Please enter a valid email");
        return false;
    }
    else {
        uEmailValid.classList.add("hidden");
    }
    if (!uPassword.value) {
        showMessage(uPasswordValid, "This field is required");
        return false;
    }
    else if (!passWordRegex.test(uPassword.value)) {
        showMessage(uPasswordValid, "Password must be at least 6 characters and contain: uppercase letters, lowercase letters and numbers");
        return false;
    }
    else {
        uPasswordValid.classList.add("hidden");
    }
    if (!uRePassword.value) {
        showMessage(uRePasswordValid, "This field is required");
        return false;
    }
    else if (uRePassword.value !== uPassword.value) {
        showMessage(uRePasswordValid, "Password doesn't match");
        return false;
    }
    else {
        uRePasswordValid.classList.add("hidden");
    }
    return true;
};
const handleRegister = () => {
    const userData = {
        displayName: uDisplayName.value,
        email: uEmail.value,
        password: uPassword.value,
        photoURL: "",
        provider: "credentials",
    };
    fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    }).then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            showMessage(messageElement, res.message, "success");
            setTimeout(() => {
                window.location.href = "/auth/password";
            }, 2000);
        }
        else {
            showMessage(messageElement, res.message);
        }
    });
};
submitRegister.addEventListener("click", (e) => {
    e.preventDefault();
    if (handleCheckValid()) {
        handleRegister();
    }
});
