export class Card {
    cardBack;
    cardFront;
    constructor(cardBack, cardFront) {
        this.cardBack = cardBack;
        this.cardFront = cardFront;
    }
    render() {
        return `<div class="card relative shadow-lg h-[170px] rounded-lg overflow-hidden">
                    <div class="card-back h-full">
                        <img src="/images/themepacks/${this.cardBack}" class="w-full h-full" alt="cardBack"/>
                    </div>
                    <div class="card-front w-full h-full">
                        <div>
                            <img src="/images/themepacks/${this.cardFront}" class="w-full h-full" alt="cardBack"/>
                        </div>
                    </div>
                </div>`;
    }
}
export class GameCard extends Card {
    icon;
    value;
    constructor({ cardFront, cardBack, icon, value }) {
        super(cardBack, cardFront);
        this.icon = icon;
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    render(isNormal) {
        return `<div data-value="${this.getValue()}"
                    class="card relative shadow-lg h-[${isNormal ? "170" : "135"}px] rounded-lg overflow-hidden"
                >
                    <div class="card-back h-full">
                        <img src="/images/themepacks/${this.cardBack}" class="w-full h-full" alt=""/>
                    </div>
                    <div class="card-front w-full h-full">
                        <div>
                            <img src="/images/themepacks/${this.cardFront}" class="w-full h-full" alt/>
                        </div>
                        <div class="absolute top-0 left-0 bg-white w-auto h-full shadow-lg"></div>
                        <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                            <i class="${this.icon} text-4xl"></i>
                        </div>
                    </div>
                </div>`;
    }
}
export class CardThemeCard extends Card {
    themeName;
    _id;
    constructor({ cardBack, themeName, _id }) {
        super(cardBack);
        this.themeName = themeName;
        this._id = _id;
    }
    render(isSelected) {
        return `<div id="themeCard${this._id}" data-value=${this._id}
                    class="theme-card ${isSelected ? "selected" : ""} w-full max-h-[145px] bg-white shadow shadow-lg rounded-xl overflow-hidden"
                >
                    <img class="h-full w-full" src="/images/themepacks/${this.cardBack}" alt="${this.themeName} Card Theme"/>
                </div>`;
    }
    unSelectedCurrentActiveCard = () => {
        const listCardThemes = document.querySelectorAll(".theme-card");
        listCardThemes.forEach((card) => {
            card.classList.remove("selected");
        });
    };
    setSelectEvent() {
        const element = document.getElementById(`themeCard${this._id}`);
        if (element) {
            element.addEventListener('click', () => {
                this.unSelectedCurrentActiveCard();
                element.classList.add("selected");
                localStorage.setItem("cardTheme", element.getAttribute("data-value") ?? "");
            });
        }
    }
}
export class GameThemeCard extends Card {
    themeName;
    _id;
    constructor({ themeThumbnail, themeName, _id }) {
        super(themeThumbnail);
        this.themeName = themeName;
        this._id = _id;
    }
    render(isSelected) {
        return `<div class="flex flex-col justify-center items-center gap-2">
                    <div id="themeGame${this._id}" 
                        data-value=${this._id} 
                        class="theme-game ${isSelected ? "selected" : ""} w-full max-h-[145px] bg-white shadow shadow-lg  overflow-hidden"
                        >
                        <img src="/images/game_thumbnails/${this.cardBack}" alt="${this.themeName} Card Theme"/>
                    </div>
                    <p class="text-xl text-secondary">${this.themeName}</p>
                </div>`;
    }
    unSelectedCurrentActiveCard = () => {
        const listGameThemes = document.querySelectorAll(".theme-game");
        console.log(listGameThemes);
        listGameThemes.forEach((card) => {
            card.classList.remove("selected");
        });
    };
    setSelectEvent() {
        const element = document.getElementById(`themeGame${this._id}`);
        if (element) {
            element.addEventListener('click', () => {
                this.unSelectedCurrentActiveCard();
                element.classList.add("selected");
                localStorage.setItem("gameTheme", element.getAttribute("data-value") ?? "");
            });
        }
    }
}
