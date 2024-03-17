const submitGameThemeButton: HTMLButtonElement = document.getElementById("submitButton")! as HTMLButtonElement;
const gameThemeName: HTMLInputElement = document.getElementById("themeName")! as HTMLInputElement;
const gameThemeData: HTMLTextAreaElement = document.getElementById("themeData")! as HTMLTextAreaElement;

submitGameThemeButton.addEventListener("click", (e) => {
	e.preventDefault();

	const parseGameData = gameThemeData.value.split("\n");
	const mapGameData = parseGameData.map((value) => {
		let temp = value.split("|");
		if (temp.length > 1) {
			return {
				icon: temp[0],
				value: temp[1],
				type: "icon",
			};
		} else {
			return {
				icon: temp[0],
				value: temp[0],
				type: "icon",
			};
		}
	});

	const dataToSend = {
		themeName: themeName.value,
		themeData: mapGameData,
	};

	fetch("/api/game-themes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataToSend),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Response from server:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
});
