const gameThemeId = document.getElementById("gameThemeId").value;
const currentCardThemeId = localStorage.getItem("cardTheme") ?? "";
const themeNameDetail = document.getElementById("themeNameDetail");
const themeTotalItemsDetail = document.getElementById("themeTotalItemsDetail");
const themePlayedDetail = document.getElementById("themePlayedDetail");
const themeThumbnail = document.getElementById("themeThumbnail");
const listThemeDataContainer = document.getElementById("listThemeDataContainer");
const fetchCardData = fetch(`/api/card-themes/${currentCardThemeId}`)
    .then((res) => res.json())
    .then((res) => {
    console.log(res);
    if (res.status === "success") {
        return res.data;
    }
});
const fetchGameData = fetch(`/api/game-themes/${gameThemeId}/`)
    .then((res) => res.json())
    .then((res) => {
    if (res.status === "success") {
        return res.data;
    }
});
Promise.all([fetchCardData, fetchGameData]).then(([cardData, gameData]) => {
    console.log(cardData, gameData);
    const { cardFront } = cardData;
    themeNameDetail.innerHTML = gameData.themeName;
    themeTotalItemsDetail.innerHTML = gameData.themeData.length.toString();
    themePlayedDetail.innerHTML = gameData.played.toString();
    themeThumbnail.src = `/images/game_thumbnails/${gameData.themeThumbnail}`;
    listThemeDataContainer.innerHTML = gameData.themeData
        .map((gameTheme) => {
        return `
             <div class="relative w-full max-h-[180px] bg-white shadow shadow-lg rounded-xl overflow-hidden">
 				<img src="/images/themepacks/${cardFront}" alt="" />
 				<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
 					<i class="${gameTheme.icon} text-4xl"></i>
 				</div>
 			</div>
            `;
    })
        .join("");
});
export {};
