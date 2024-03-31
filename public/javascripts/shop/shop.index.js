"use strict";
const listTabs = document.querySelectorAll(".btn-tab");
const searchParams = new URLSearchParams(window.location.search);
const tab = searchParams.get("tab") ?? "card-themes";
listTabs.forEach((button) => {
    if (button.getAttribute("data-tab") === tab) {
        button.classList.add("active");
        button.classList.remove("inactive");
    }
    else {
        button.classList.add("inactive");
        button.classList.remove("active");
    }
    button.addEventListener("click", () => {
        window.location.href = `/shop?tab=${button.getAttribute("data-tab")}`;
    });
});
