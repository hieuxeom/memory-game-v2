import {IUser} from "../type/user";
import {IHistoryResponse} from "../type/history";
import {HistoryCard} from "../utils/History.js";
import {IApiResponse} from "../type/response";

const historyContainer: HTMLElement = document.getElementById("historyContainer") as HTMLElement;

const userId: string | null = localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")!) as IUser)._id : null;
console.log(userId);

if (userId) {
    const historyGameData = new Promise((resolve, reject) => {
        fetch(`/api/game-history/${userId}`)
            .then((res: Response) => res.json())
            .then(async (res: IApiResponse) => {
                if (res.status === "success") {
                    const historyData: IHistoryResponse[] = res.data;
                    const resolveData = await Promise.all(historyData.map(async (data: IHistoryResponse) => await new HistoryCard(data).render()))
                    historyContainer.innerHTML = resolveData.join("")
                }

            });
    })

}
// const playerHistory =