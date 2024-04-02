import {ICardFilterResponse, ICardThemeResponse} from "../type/cardTheme";
import {IApiResponse} from "../type/response";

const listThemesContainer: HTMLDivElement = document.getElementById("listThemesContainer") as HTMLDivElement;
const searchParams = new URLSearchParams(window.location.search);
const filter = searchParams.get("filter") ?? "default"

if (filter === "default") {
    fetch(`/api/card-themes`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse): NodeListOf<HTMLButtonElement>[] => {
            if (res.status === "success") {
                const listCardThemes = res.data
                listThemesContainer.innerHTML = listCardThemes
                    .map(({_id, themeName, isVip, isDeleted}: ICardThemeResponse) => {
                        console.log(isDeleted);
                        return `<div class="text-xl flex justify-between items-center">
                            <div class="w-3/4 flex items-center gap-2">
                                <p class="text-secondary">${themeName}</p>
                                ${isVip ? ("<span class='tag-vip'>VIP</span>") : ""}
                                ${isDeleted ? ("<span class='tag-deleted'>Removed</span>") : ""}
                            </div>
                            <div class="w-1/4 flex justify-center items-center gap-4">
                                ${isDeleted ?
                            `<button data-button="${_id}"
                                class="recover-button flex justify-center items-center text-sm text-white rounded-xl bg-success w-8 h-8"
                            >
                                <i class="fa-solid fa-rotate-left"></i>
                            </button>` :
                            `<a href="/admin/card-themes/edit/${_id}"
                                class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8"
                            >
                                <i class="fa-solid fa-pen"></i>
                            </a>`
                        }
                                ${isDeleted ?
                            `<button data-button="${_id}"
                                class="forcedel-button flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>` :
                            `<button data-button="${_id}"
                                class="softdel-button flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>`
                        }
                                
                            </div>
			            </div>`;
                    }).join("");
            }
            return [document.querySelectorAll(".softdel-button"), document.querySelectorAll(".recover-button"), document.querySelectorAll(".forcedel-button")];
        })
        .then(([listSoftDelButtons, listRecoverButtons, listForceDelButtons]) => {
            handleMapSoftDelete(listSoftDelButtons)
            handleMapRecover(listRecoverButtons)
            handleMapForceDelete(listForceDelButtons)
        })
} else {
    fetch(`/api/card-themes?filter=${filter}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse): NodeListOf<HTMLButtonElement>[] => {

            if (res.status === "success") {
                const listCardThemes = res.data;

                listThemesContainer.innerHTML = listCardThemes.map(({title, data}: ICardFilterResponse) => {
                        if (data.length < 1) {
                            return null
                        }
                        const mapData = data.map(({_id, themeName, isVip, isDeleted}: ICardThemeResponse) => {
                            return `<div class="text-xl flex justify-between items-center">
                            <div class="w-3/4 flex items-center gap-2">
                                <p class="text-secondary">${themeName}</p>
                                ${isVip ? ("<span class='tag-vip'>VIP</span>") : ""}
                                ${isDeleted ? ("<span class='tag-deleted'>Removed</span>") : ""}
                            </div>
                            <div class="w-1/4 flex justify-center items-center gap-4">
                                ${isDeleted ?
                                `<button data-button="${_id}"
                                class="recover-button flex justify-center items-center text-sm text-white rounded-xl bg-success w-8 h-8"
                            >
                                <i class="fa-solid fa-rotate-left"></i>
                            </button>` :
                                `<a href="/admin/card-themes/edit/${_id}"
                                class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8"
                            >
                                <i class="fa-solid fa-pen"></i>
                            </a>`
                            }
                                ${isDeleted ?
                                `<button data-button="${_id}"
                                class="forcedel-button flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>` :
                                `<button data-button="${_id}"
                                class="softdel-button flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>`
                            }
                                
                            </div>
			            </div>`
                        })

                        return `<div class="w-full flex flex-col justify-center items-center gap-2">
                    <div>
                        <h4 class="text-3xl text-primary">${title}</h4>
                    </div>
                    <div class="w-full flex flex-col gap-4">
                        ${mapData.join("")}
                    </div>
                </div>`
                    })
                    .filter((item: string) => item).join("<hr class='hr'>")
            }
            return [document.querySelectorAll(".softdel-button"), document.querySelectorAll(".recover-button"), document.querySelectorAll(".forcedel-button")];
        })
        .then(([listSoftDelButtons, listRecoverButtons, listForceDelButtons]) => {
            handleMapSoftDelete(listSoftDelButtons)
            handleMapRecover(listRecoverButtons)
            handleMapForceDelete(listForceDelButtons)
        });
}

const handleMapForceDelete = (listButtons: NodeListOf<HTMLButtonElement>) => {
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const cardThemeId = button.getAttribute("data-button");
            fetch(`/api/card-themes/${cardThemeId}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((res: IApiResponse) => {
                    if (res.status === "redirect") {
                        window.location.href = res.url!;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}

const handleMapSoftDelete = (listButtons: NodeListOf<HTMLButtonElement>) => {
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const cardThemeId = button.getAttribute("data-button");
            fetch(`/api/card-themes/${cardThemeId}/delete`, {
                method: "PUT"
            })
                .then((res) => res.json())
                .then((res: IApiResponse) => {
                    if (res.status === "redirect") {
                        window.location.href = res.url!;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}

const handleMapRecover = (listButtons: NodeListOf<HTMLButtonElement>) => {
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const cardThemeId = button.getAttribute("data-button");
            fetch(`/api/card-themes/${cardThemeId}/recover`, {
                method: "PUT"
            })
                .then((res) => res.json())
                .then((res: IApiResponse) => {
                    if (res.status === "redirect") {
                        window.location.href = res.url!;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}

