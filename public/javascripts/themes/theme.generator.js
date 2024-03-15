var _a;
var themeContainer = document.getElementById("themeContainer");
var currentCardTheme = (_a = localStorage.getItem("cardTheme")) !== null && _a !== void 0 ? _a : "";
var handleUnSelectedCard = function (listCardThemes) {
    listCardThemes.forEach(function (card) {
        card.classList.remove("selected");
    });
};
var handleLoadingTheme = function () {
    return new Promise(function (resolve, reject) {
        fetch("/api/card-themes")
            .then(function (res) { return res.json(); })
            .then(function (listCardThemes) {
            themeContainer.innerHTML = listCardThemes
                .map(function (card) {
                return "<div data-value=".concat(card._id, " class=\"theme-card ").concat(card._id === currentCardTheme ? "selected" : "", " w-full max-h-[180px] bg-white shadow shadow-lg rounded-xl overflow-hidden\">\n                                    <img src=\"/images/themepacks/").concat(card.cardBack, "\" alt=\"").concat(card.themeName, " Card Theme\"/>\n                                </div>");
            })
                .join("");
            return document.querySelectorAll(".theme-card");
        })
            .then(function (listCardThemes) {
            listCardThemes.forEach(function (card) {
                card.addEventListener("click", function () {
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
export {};
