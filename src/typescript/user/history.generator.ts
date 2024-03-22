import {IUser} from "../type/user";
import {IHistoryResponse} from "../type/history";
import {HistoryCard} from "../utils/History.js";

const historyContainer: HTMLElement = document.getElementById("historyContainer") as HTMLElement;

const userId: string | null = localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")!) as IUser)._id : null;
console.log(userId);

if (userId) {
    const historyGameData = new Promise((resolve, reject) => {
        fetch(`/api/users/${userId}/game-history`)
            .then(res => res.json())
            .then(async (historyData: IHistoryResponse[]) => {
                const resolveData = await Promise.all(historyData.map(async (data: IHistoryResponse) => await new HistoryCard(data).render()))
                historyContainer.innerHTML = resolveData.join("")
            });
    })

}
// const playerHistory =