import {IHistoryResponse} from "../type/history";
import {IGameThemeResponse} from "../type/gameTheme";
import {ICardThemeResponse} from "../type/cardTheme";

const gameSizeString: Record<number, string> = {
    16: "4x4",
    20: "4x5"
}

export class HistoryCard {

    cardThemeId: string;
    gameThemeId: string;
    createdAt: string;
    gameSize: number;
    gameTime: number;
    turns: number;

    constructor({cardThemeId, gameThemeId, gameSize, gameTime, turns, createdAt}: IHistoryResponse) {
        this.cardThemeId = cardThemeId
        this.gameThemeId = gameThemeId
        this.gameSize = gameSize
        this.createdAt = createdAt
        this.turns = turns
        this.gameTime = gameTime
    }

    convertTimeToString() {

    }
    async getCardThemeImage() {
        return await new Promise(((resolve, reject) => {
            fetch(`/api/card-themes/${this.cardThemeId}`)
                .then(res => res.json())
                .then((res: ICardThemeResponse) => {
                    resolve(res.cardBack)
                })
        }))
    }

    async getGameThumbnail() {
        return await new Promise(((resolve, reject) => {
            fetch(`/api/game-themes/${this.gameThemeId}`)
                .then(res => res.json())
                .then((res: IGameThemeResponse) => {
                    if (res) {
                        resolve(res.themeThumbnail)
                    } else {
                        resolve("")
                    }
                })
        }))
    }

    async render() {
        return `<div class="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-max flex justify-between items-center gap-4 p-4 rounded-xl">
                    <div class="w-1/2 flex flex-col gap-2">
                        <p class="text-sm text-slate-500">12:29 21/03/2024</p>
                        <p class="text-5xl text-header-shadow">${gameSizeString[this.gameSize]}</p>
                        <div class="flex gap-1 items-center text-xl">
                            <p class="text-primary">125</p>
                            <p>turns in</p>
                            <p class="text-primary">128s</p>
                        </div>
                    </div>
                    <div class="w-1/2 flex justify-center gap-4 items-center">
                        <img class="w-24" src="/images/themepacks/${await this.getCardThemeImage()}" alt="">
            
                        <img class="w-24" src="/images/game_thumbnails/${await this.getGameThumbnail()}" alt="">
            
                    </div>
                </div>`
    }
}


