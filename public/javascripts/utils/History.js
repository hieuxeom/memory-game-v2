export class HistoryCard {
    cardThemeId;
    gameThemeId;
    createdAt;
    gameSize;
    gameTurn;
    gameTime;
    gameScore;
    constructor({ cardThemeId, gameThemeId, gameSize, gameTime, gameTurn, gameScore, createdAt }) {
        this.cardThemeId = cardThemeId;
        this.gameThemeId = gameThemeId;
        this.gameSize = gameSize;
        this.createdAt = createdAt;
        this.gameTime = gameTime;
        this.gameTurn = gameTurn;
        this.gameScore = gameScore;
    }
    convertTimeToString() {
    }
    async getCardThemeImage() {
        return await new Promise(((resolve, reject) => {
            fetch(`/api/card-themes/${this.cardThemeId}`)
                .then(res => res.json())
                .then((res) => {
                resolve(res.cardBack);
            });
        }));
    }
    async getGameThumbnail() {
        return await new Promise(((resolve, reject) => {
            fetch(`/api/game-themes/${this.gameThemeId}`)
                .then(res => res.json())
                .then((res) => {
                if (res) {
                    resolve(res.themeThumbnail);
                }
                else {
                    resolve("");
                }
            });
        }));
    }
    async render() {
        let date = new Date(this.createdAt);
        const time = `${date.toLocaleTimeString("es-AR")} ${date.toLocaleDateString("es-AR")}`;
        return `<div class="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-max flex justify-between items-center gap-2 p-4 rounded-xl">
                    <div class="w-1/2 flex flex-col gap-2">
                        <p class="text-sm text-slate-500">${time}</p>
                        <div class="flex gap-2 items-center">
                            <p class="text-4xl text-header-shadow">${this.gameSize}</p>
                            <p class="text-4xl text-header-shadow">-</p>
                            <p class="text-6xl text-header-shadow">${this.gameScore}</p>
                        </div>
                        <div class="flex gap-1 items-center">
                            <p class="text-primary">${this.gameTurn}</p>
                            <p>turns in</p>
                            <p class="text-primary">${this.gameTime}s</p>
                        </div>
                    </div>
                    <div class="w-1/2 flex justify-center gap-2 items-center">
                        <img class="w-24" src="/images/themepacks/${await this.getCardThemeImage()}" alt="">
            
                        <img class="w-24" src="/images/game_thumbnails/${await this.getGameThumbnail()}" alt="">
            
                    </div>
                </div>`;
    }
}
