var listGameThemesContainer = document.getElementById("listGameThemesContainer");
var onLoad = function () {
    fetch("/api/game-themes")
        .then(function (res) { return res.json(); })
        .then(function (listGameThemes) {
        listGameThemesContainer.innerHTML = listGameThemes
            .map(function (gameTheme) {
            return "<div class=\"text-xl flex justify-between items-center\">\n\t\t\t\t<div class=\"w-4/6\">\n\t\t\t\t\t<p class=\"text-xl text-secondary\">".concat(gameTheme.themeName, "</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"w-2/6 flex justify-center items-center gap-4\">\n                <a href=\"/admin/game-themes/").concat(gameTheme._id, "\" class=\"block flex justify-center items-center text-sm text-white rounded-xl bg-secondary w-8 h-8\"><i class=\"fa-solid fa-eye\"></i></a>\n\t\t\t\t\t<a href=\"/admin/game-themes/edit/").concat(gameTheme._id, "\" class=\"block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8\"><i\n\t\t\t\t\t\t\tclass=\"fa-solid fa-pen\"\n\t\t\t\t\t\t></i></a>\n\t\t\t\t\t<button button-data=\"").concat(gameTheme._id, "\" class=\"delete-theme flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8\"><i\n\t\t\t\t\t\t\tclass=\"fa-solid fa-trash\"\n\t\t\t\t\t\t></i></button>\n\t\t\t\t</div>\n\t\t\t</div>");
        }).join("");
        return document.querySelectorAll(".delete-theme");
    }).then(function (listButtonDelete) {
        listButtonDelete.forEach(function (button) {
            button.addEventListener("click", function () {
                var themeId = button.getAttribute("button-data");
                fetch("/api/game-themes/".concat(themeId), {
                    method: "DELETE",
                }).then(function (res) {
                    if (res.url) {
                        return window.location.href = res.url;
                    }
                });
            });
        });
    });
};
onLoad();
export {};
