import {ICardThemeResponse} from "../type/cardTheme";

const listThemesContainer: HTMLDivElement = document.getElementById("listThemesContainer") as HTMLDivElement;

fetch("/api/card-themes")
    .then((res) => res.json())
    .then((listCardThemes): NodeListOf<HTMLButtonElement> => {
        listThemesContainer.innerHTML = listCardThemes
            .map((cardTheme: ICardThemeResponse) => {
                return `<div class="text-xl flex justify-between items-center">
                            <div class="w-3/4">
                                <p>${cardTheme.themeName}</p>
                            </div>
                            <div class="w-1/4 flex justify-center items-center gap-4">
                                <a href="/admin/card-themes/edit/${cardTheme._id}" class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8"><i
                                        class="fa-solid fa-pen"
                                    ></i></a>
                                <button button-data="${cardTheme._id}" class="delete-theme flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"><i
                                        class="fa-solid fa-trash"
                                    ></i></button>
                            </div>
			            </div>`;
            }).join("");

        return document.querySelectorAll(".delete-theme");
    })
    .then((listDeleteButtons) => {
        listDeleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const cardThemeId = button.getAttribute("button-data");
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
    });
