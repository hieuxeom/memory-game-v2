var listThemesContainer = document.getElementById("listThemesContainer");
fetch("/api/card-themes")
	.then(function (res) {
		return res.json();
	})
	.then(function (listCardThemes) {
		listThemesContainer.innerHTML = listCardThemes
			.map(function (cardTheme) {
				return '<div class="text-xl flex justify-between items-center">\n\t\t\t\t<div class="w-3/4">\n\t\t\t\t\t<p>'
					.concat(
						cardTheme.themeName,
						'</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="w-1/4 flex justify-center items-center gap-4">\n\t\t\t\t\t<a href="/admin/card-themes/edit/'
					)
					.concat(
						cardTheme._id,
						'" class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8"><i\n\t\t\t\t\t\t\tclass="fa-solid fa-pen"\n\t\t\t\t\t\t></i></a>\n\t\t\t\t\t<button button-data="'
					)
					.concat(
						cardTheme._id,
						'" class="delete-theme flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"><i\n\t\t\t\t\t\t\tclass="fa-solid fa-trash"\n\t\t\t\t\t\t></i></button>\n\t\t\t\t</div>\n\t\t\t</div>'
					);
			})
			.join("");
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
