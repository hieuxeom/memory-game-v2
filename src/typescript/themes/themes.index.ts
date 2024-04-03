const listTabs = document.querySelectorAll(".btn-tab") as NodeListOf<HTMLButtonElement>;

const searchParams = new URLSearchParams(window.location.search);
const tab = searchParams.get("tab") ?? "card-themes";

const handleTabDirection = () => {
    listTabs.forEach((button) => {
        if (button.getAttribute("data-tab") === tab) {
            button.classList.add("active")
            button.classList.remove("inactive")
        } else {
            button.classList.add("inactive")
            button.classList.remove("active")
        }
        button.addEventListener("click", () => {
            window.location.href = `/themes?tab=${button.getAttribute("data-tab")}`;
        })
    })
}


handleTabDirection();