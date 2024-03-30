const submitButton = document.getElementById("submitButton");
console.log(submitButton);
const themeId = document.getElementById("themeId");
const themeName = document.getElementById("themeName");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");
const isVip = document.getElementById("isVip");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const editData = new FormData();
    editData.append("themeId", themeId.value);
    editData.append("themeName", themeName.value);
    editData.append("cardFront", cardFront.files ? cardFront.files[0] : "");
    editData.append("cardBack", cardBack.files ? cardBack.files[0] : "");
    editData.append("isVip", `${isVip.checked}`);
    const requestOptions = {
        method: "PUT",
        body: editData,
    };
    fetch("/api/card-themes", requestOptions).then((res) => res.json()).then((res) => {
        if (res.status === "redirect") {
            window.location.href = res.url;
        }
        else {
            console.log(res);
        }
    });
});
export {};
