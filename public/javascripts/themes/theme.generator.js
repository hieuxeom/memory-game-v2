"use strict";
var _a;
const themeContainer = document.getElementById("themeContainer");
const currentCardTheme = (_a = localStorage.getItem("cardTheme")) !== null && _a !== void 0 ? _a : "";
const handleUnSelectedCard = (listCardThemes) => {
    listCardThemes.forEach((card) => {
        card.classList.remove("selected");
    });
};
const handleLoadingTheme = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/themes")
            .then((res) => res.json())
            .then((listCardThemes) => {
            themeContainer.innerHTML = listCardThemes
                .map((card) => {
                return `<div data-value=${card._id} class="theme-card ${card._id === currentCardTheme ? "selected" : ""} w-full max-h-[180px] bg-white shadow shadow-lg rounded-xl overflow-hidden">
                                    <img src="/images/themepacks/${card.cardBack}" alt="${card.themeName} Card Theme"/>
                                </div>`;
            })
                .join("");
            return document.querySelectorAll(".theme-card");
        })
            .then((listCardThemes) => {
            listCardThemes.forEach((card) => {
                card.addEventListener("click", () => {
                    var _a;
                    handleUnSelectedCard(listCardThemes);
                    card.classList.add("selected");
                    localStorage.setItem("cardTheme", (_a = card.getAttribute("data-value")) !== null && _a !== void 0 ? _a : "");
                });
            });
        });
    });
};
handleLoadingTheme();
