"use strict";
const ThemeData = [
    {
        themeId: "1",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "2",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "3",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "4",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "5",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "6",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "7",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "8",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "9",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "10",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "11",
        imagePath: "images/theme-background-1.png"
    },
    {
        themeId: "12",
        imagePath: "images/theme-background-1.png"
    }
];
const listThemeCards = document.querySelectorAll(".theme-card");
let themeSelect = localStorage.getItem("currentTheme");
const updateSelectedTheme = (themeId) => {
    return localStorage.setItem("currentTheme", themeId);
};
const handleRemoveSelectedBorder = () => {
    listThemeCards.forEach(card => {
        if (card.className.includes("border")) {
            card.classList.remove("border");
            card.classList.remove("border-2");
            card.classList.remove("border-primary");
        }
    });
};
if (!themeSelect) {
    themeSelect = "1";
    updateSelectedTheme(themeSelect);
}
listThemeCards.forEach(card => {
    card.addEventListener("click", () => {
        handleRemoveSelectedBorder();
        updateSelectedTheme(card.getAttribute("data-value"));
        card.classList.add("border");
        card.classList.add("border-2");
        card.classList.add("border-primary");
    });
});
