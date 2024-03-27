export type MessageType = "error" | "success"
export const showMessage = (element: HTMLElement, message: string, type: MessageType = "error") => {
    element.classList.remove("hidden");
    if (type !== "error") {
        element.classList.add("text-green-500");
    }

    return element.innerHTML = message;
}

export const hideMessage = (element: HTMLElement) => {
    element.classList.add("hidden");
    return element.classList.remove("text-green-500");
}