import { HistoryCard } from "../utils/History.js";
const historyContainer = document.getElementById("historyContainer");
const userId = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData"))._id : null;
console.log(userId);
if (userId) {
    const historyGameData = new Promise((resolve, reject) => {
        fetch(`/api/users/${userId}/game-history`)
            .then(res => res.json())
            .then(async (historyData) => {
            const resolveData = await Promise.all(historyData.map(async (data) => await new HistoryCard(data).render()));
            historyContainer.innerHTML = resolveData.join("");
        });
    });
}
// const playerHistory =
