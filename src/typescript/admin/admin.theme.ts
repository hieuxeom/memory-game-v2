const submitButton: HTMLButtonElement = document.getElementById("submitButton") as HTMLButtonElement;

const themeId: HTMLInputElement = document.getElementsByName("themeId")[0] as HTMLInputElement;
const themeName: HTMLInputElement = document.getElementsByName("themeName")[0] as HTMLInputElement;
const cardFront: HTMLInputElement = document.getElementsByName("themeFront")[0] as HTMLInputElement;
const cardBack: HTMLInputElement = document.getElementsByName("themeBack")[0] as HTMLInputElement;

// formData.append("themeName");
submitButton.addEventListener("click", (event) => {
	event.preventDefault();

	const formData: FormData = new FormData();
	formData.append("themeId", themeId.value);
	formData.append("themeName", themeName.value);
	formData.append("themeFront", cardFront.files ? cardFront.files[0] : "");
	formData.append("themeBack", cardBack.files ? cardBack.files[0] : "");

	const requestOptions = {
		method: "PUT",
		body: formData,
	};

	fetch("/api/themes", requestOptions).then((res) => {
		if (res.url) {
			window.location.href = res.url;
		}
	});
});
