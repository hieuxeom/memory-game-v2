const listThemesContainer = document.getElementById("listThemesContainer");
const searchParams = new URLSearchParams(window.location.search);
const filter = searchParams.get("filter") ?? "default";
if (filter === "default") {
    fetch(`/api/card-themes`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            const listCardThemes = res.data;
            listThemesContainer.innerHTML = listCardThemes
                .map((cardTheme) => {
                return `<div class="text-xl flex justify-between items-center">
                            <div class="w-3/4">
                                <p class="text-secondary">${cardTheme.themeName}</p>
                            </div>
                            <div class="w-1/4 flex justify-center items-center gap-4">
                                <a href="/admin/card-themes/edit/${cardTheme._id}"
                                    class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8"
                                >
                                    <i class="fa-solid fa-pen"></i>
                                </a>
                                <button data-button="${cardTheme._id}"
                                        class="delete-theme flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
			            </div>`;
            }).join("");
        }
        return document.querySelectorAll(".delete-theme");
    })
        .then((listDeleteButtons) => {
        handleMapDelete(listDeleteButtons);
    });
}
else {
    fetch(`/api/card-themes?filter=${filter}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            const listCardThemes = res.data;
            listThemesContainer.innerHTML = listCardThemes.map(({ title, data }) => {
                if (data.length < 1) {
                    return null;
                }
                const mapData = data.map(({ _id, themeName }) => {
                    return `<div class="text-xl w-full flex justify-between items-center">
                                <div class="w-3/4">
                                    <p class="text-secondary">${themeName}</p>
                                </div>
                                <div class="w-1/4 flex justify-center items-center gap-4">
                                    <a href="/admin/card-themes/edit/${_id}"
                                       class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8"
                                    >
                                        <i class="fa-solid fa-pen"></i>
                                    </a>
                                    <button data-button="${_id}"
                                            class="delete-theme flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                        </div>`;
                });
                return `<div class="w-full flex flex-col justify-center items-center gap-2">
                    <div>
                        <h4 class="text-3xl text-primary">${title}</h4>
                    </div>
                    <div class="w-full flex flex-col gap-4">
                        ${mapData.join("")}
                    </div>
                </div>`;
            })
                .filter((item) => item).join("<hr class='hr'>");
        }
        return document.querySelectorAll(".delete-theme");
    }).then((listDeleteButtons) => {
        handleMapDelete(listDeleteButtons);
    });
}
const handleMapDelete = (listButtons) => {
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const cardThemeId = button.getAttribute("data-button");
            fetch(`/api/card-themes/${cardThemeId}`, {
                method: "DELETE",
            })
                .then((res) => {
                if (res.url) {
                    return (window.location.href = res.url);
                }
            })
                .catch((err) => {
                console.error(err);
            });
        });
    });
};
export {};
