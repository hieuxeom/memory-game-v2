import {IGameThemeResponse} from "../type/gameTheme";
import {IApiResponse} from "../type/response";

const listGameThemesContainer: HTMLElement = document.getElementById("listGameThemesContainer") as HTMLElement;

const onLoad = () => {
    fetch("/api/game-themes")
        .then((res: Response) => res.json())
        .then((res: IApiResponse): NodeListOf<HTMLElement> => {
            if (res.status === "success") {
                const listGameThemes = res.data;
                listGameThemesContainer.innerHTML = listGameThemes
                    .map((gameTheme: IGameThemeResponse) => {
                        return `<div class="text-xl flex justify-between items-center">
                                <div class="w-4/6">
                                    <p class="text-xl text-secondary">${gameTheme.themeName}</p>
                                </div>
                                <div class="w-2/6 flex justify-center items-center gap-4">
                                    <a href="/admin/game-themes/${gameTheme._id}" class="block flex justify-center items-center text-sm text-white rounded-xl bg-secondary w-8 h-8">
                                        <i class="fa-solid fa-eye"></i>
                                    </a>
                                    <a href="/admin/game-themes/edit/${gameTheme._id}" class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8">
                                        <i class="fa-solid fa-pen"></i>
                                    </a>
                                    <button data-button="${gameTheme._id}" class="delete-theme flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                            </div>
                        </div>`;
                    }).join("");
            }
            return document.querySelectorAll(".delete-theme")
        }).then((listButtonDelete) => {
        listButtonDelete.forEach((button) => {
            button.addEventListener("click", () => {
                const themeId = button.getAttribute("data-button");
                fetch(`/api/game-themes/${themeId}`, {
                    method: "DELETE",
                })
                    .then((res: Response) => res.json())
                    .then((res: IApiResponse) => {
                        if (res.status === "redirect") {
                            return window.location.href = res.url!;
                        }
                    })
            })
        })
    });
};

onLoad();
