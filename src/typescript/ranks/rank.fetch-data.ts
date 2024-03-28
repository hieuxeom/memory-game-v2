import {IApiResponse} from "../type/response";

export interface IRankDataResponse {
    gameScore: number;
    displayName: string;
}

export const fetchRankData = async () => {
    const currentFilter = document.querySelector(".btn-rank-filter.active")?.getAttribute("data-filter") ?? "overall";
    const listRankContainer: HTMLElement = document.getElementById("listRankContainer") as HTMLElement;
    let rankData: null | IRankDataResponse[] = null;

    rankData = await getRankData(currentFilter);

    if (rankData) {
        listRankContainer.innerHTML = rankData.map((row, index) => {
            return `<div class="flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-md">
                        <div class="flex items-center gap-4 ${index + 1 < 2 ? "text-primary" : "text-secondary"}">
                            <div id="position" class="text-xl ">${index + 1}.</div>
                            <div id="playerName" class="text-xl">${row.displayName}</div>
                        </div>
                        <div>
                            <div id="gameScore" class="text-xl ${index + 1 < 2 ? "text-primary" : "text-secondary"}">${row.gameScore}</div>
                        </div>
                    </div>`
        }).join("")
    }
}

const getRankData = (filter: string): Promise<IRankDataResponse[]> => {
    return new Promise((resolve, reject) => {
        fetch(`/api/ranks?filter=${filter}`)
            .then((res: Response) => res.json())
            .then((res: IApiResponse) => {
            if (res.status === "success") {
                resolve(res.data)
            } else {
                reject(null)
            }
        })
    })
}


