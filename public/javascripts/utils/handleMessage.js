export const showMessage = (element, message, type = "error") => {
    element.classList.remove("hidden");
    if (type !== "error") {
        element.classList.add("text-green-500");
    }
    return element.innerHTML = message;
};
export const hideMessage = (element) => {
    element.classList.add("hidden");
    return element.classList.remove("text-green-500");
};
