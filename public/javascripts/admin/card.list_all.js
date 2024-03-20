var listThemesContainer = document.getElementById("listThemesContainer");
fetch("/api/card-themes")
    .then(function (res) { return res.json(); })
    .then(function (listCardThemes) {
    listThemesContainer.innerHTML = listCardThemes
        .map(function (cardTheme) {
        return "<div class=\"text-xl flex justify-between items-center\">\n                            <div class=\"w-3/4\">\n                                <p>".concat(cardTheme.themeName, "</p>\n                            </div>\n                            <div class=\"w-1/4 flex justify-center items-center gap-4\">\n                                <a href=\"/admin/card-themes/edit/").concat(cardTheme._id, "\" class=\"block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8\"><i\n                                        class=\"fa-solid fa-pen\"\n                                    ></i></a>\n                                <button button-data=\"").concat(cardTheme._id, "\" class=\"delete-theme flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8\"><i\n                                        class=\"fa-solid fa-trash\"\n                                    ></i></button>\n                            </div>\n\t\t\t            </div>");
    }).join("");
    return document.querySelectorAll(".delete-theme");
})
    .then(function (listDeleteButtons) {
    listDeleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var cardThemeId = button.getAttribute("button-data");
            fetch("/api/card-themes/".concat(cardThemeId), {
                method: "DELETE",
            })
                .then(function (res) {
                if (res.url) {
                    return (window.location.href = res.url);
                }
            })
                .catch(function (err) {
                console.error(err);
            });
        });
    });
});
export {};
