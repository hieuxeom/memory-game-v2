const listGameThemesContainer = document.getElementById("listGameThemesContainer");
const onLoad = () => {
    fetch("/api/game-themes")
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            const listGameThemes = res.data;
            listGameThemesContainer.innerHTML = listGameThemes
                .map(({ _id, themeName, isVip, isDeleted }) => {
                return `<div class="text-xl flex justify-between items-center">
                                <div class="w-4/6">
                                    <p class="text-xl text-secondary">${themeName}</p>
                                </div>
                                <div class="w-2/6 flex justify-center items-center gap-4">
                                    <a href="/admin/game-themes/${_id}" class="block flex justify-center items-center text-sm text-white rounded-xl bg-secondary w-8 h-8">
                                        <i class="fa-solid fa-eye"></i>
                                    </a>
                                    ${isDeleted ?
                    `<button data-button="${_id}" class="recover-button flex justify-center items-center text-sm text-white rounded-xl bg-success w-8 h-8">
                                 <i class="fa-solid fa-rotate-left"></i>
                            </button>` :
                    `<a href="/admin/game-themes/edit/${_id}" class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8">
                                <i class="fa-solid fa-pen"></i>
                            </a>`}
                                    ${isDeleted ?
                    `<button data-button="${_id}" class="forcedel-button flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8">
                                <i class="fa-solid fa-trash"></i>
                            </button>` :
                    `<button data-button="${_id}" class="softdel-button flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8">
                                <i class="fa-solid fa-trash"></i>
                            </button>`}  
                            </div>
                        </div>`;
            }).join("");
        }
        return [document.querySelectorAll(".forcedel-button"), document.querySelectorAll(".softdel-button"), document.querySelectorAll(".recover-button")];
    })
        .then(([listForceDelButtons, listSoftDelButtons, listRecoverButtons]) => {
        handleMapForceDelete(listForceDelButtons);
        handleMapSoftDelete(listSoftDelButtons);
        handleMapRecover(listRecoverButtons);
    });
};
const handleMapSoftDelete = (listButtons) => {
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const themeId = button.getAttribute("data-button");
            fetch(`/api/game-themes/${themeId}/delete`, {
                method: "PUT",
            })
                .then((res) => res.json())
                .then((res) => {
                if (res.status === "redirect") {
                    return window.location.href = res.url;
                }
            });
        });
    });
};
const handleMapForceDelete = (listButtons) => {
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const themeId = button.getAttribute("data-button");
            fetch(`/api/game-themes/${themeId}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((res) => {
                if (res.status === "redirect") {
                    return window.location.href = res.url;
                }
            });
        });
    });
};
const handleMapRecover = (listButtons) => {
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const themeId = button.getAttribute("data-button");
            fetch(`/api/game-themes/${themeId}/recover`, {
                method: "PUT",
            })
                .then((res) => res.json())
                .then((res) => {
                if (res.status === "redirect") {
                    return window.location.href = res.url;
                }
            });
        });
    });
};
onLoad();
export {};
