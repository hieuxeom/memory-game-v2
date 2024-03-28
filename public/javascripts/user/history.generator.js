import { HistoryCard } from "../utils/History.js";
const historyContainer = document.getElementById("historyContainer");
const userId = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData"))._id : null;
console.log(userId);
if (userId) {
    const historyGameData = new Promise((resolve, reject) => {
        fetch(`/api/game-history/${userId}`)
            .then((res) => res.json())
            .then(async (res) => {
            if (res.status === "success") {
                const historyData = res.data;
                const resolveData = await Promise.all(historyData.map(async (data) => await new HistoryCard(data).render()));
                historyContainer.innerHTML = resolveData.join("");
            }
        });
    });
}
// const playerHistory =
