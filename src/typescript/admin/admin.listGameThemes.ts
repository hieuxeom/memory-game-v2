import { IGameThemeResponse } from "../type/gameTheme";

const listGameThemesContainer: HTMLElement = document.getElementById("listGameThemesContainer") as HTMLElement;

const onLoad = () => {
	fetch("/api/game-themes")
		.then((res) => res.json())
		.then((listGameThemes) => {
			listGameThemesContainer.innerHTML = listGameThemes
				.map((gameTheme: IGameThemeResponse) => {
					return `<div class="text-xl flex justify-between items-center">
				<div class="w-4/6">
					<p class="text-xl text-secondary">${gameTheme.themeName}</p>
				</div>
				<div class="w-2/6 flex justify-center items-center gap-4">
                <a href="/admin/game-themes/${gameTheme._id}" class="block flex justify-center items-center text-sm text-white rounded-xl bg-secondary w-8 h-8"><i class="fa-solid fa-eye"></i></a>
					<a href="/admin/game-themes/edit/${gameTheme._id}" class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8"><i
							class="fa-solid fa-pen"
						></i></a>
					<button button-data="${gameTheme._id}" class="delete-theme flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"><i
							class="fa-solid fa-trash"
						></i></button>
				</div>
			</div>`;
				})
				.join("");
		});
};

onLoad();
