interface ICard {
    value: number;
    content: string;
}

function shuffle(array: ICard[]): ICard[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const gameData = [
    {
        value: 1,
        content: "fa-solid fa-a",
    },
    {
        value: 1,
        content: "fa-solid fa-a",
    },
    {
        value: 2,
        content: "fa-solid fa-b",
    },
    {
        value: 2,
        content: "fa-solid fa-b",
    },
    {
        value: 3,
        content: "fa-solid fa-c",
    },
    {
        value: 3,
        content: "fa-solid fa-c",
    },
    {
        value: 4,
        content: "fa-solid fa-d",
    },
    {
        value: 4,
        content: "fa-solid fa-d",
    },
    {
        value: 5,
        content: "fa-solid fa-e",
    },
    {
        value: 5,
        content: "fa-solid fa-e",
    },
    {
        value: 6,
        content: "fa-solid fa-f",
    },
    {
        value: 6,
        content: "fa-solid fa-f",
    },
    {
        value: 7,
        content: "fa-solid fa-g",
    },
    {
        value: 7,
        content: "fa-solid fa-g",
    },
    {
        value: 8,
        content: "fa-solid fa-h",
    },
    {
        value: 8,
        content: "fa-solid fa-h",
    },
    {
        value: 9,
        content: "fa-solid fa-j",
    },
    {
        value: 9,
        content: "fa-solid fa-j",
    },
    {
        value: 10,
        content: "fa-solid fa-k",
    },
    {
        value: 10,
        content: "fa-solid fa-k",
    },
];

const playContainer: HTMLElement = (document.getElementById("playContainer") as HTMLElement) ?? null;

const size = localStorage.getItem("difficult") === "4x4" ? 16 : 20;

const cardComps = (content: string, value: string) => {
    return `<div class="card relative shadow-lg h-[180px]" data-value="${value}">
    <div class="card-back">
        <div class="absolute rounded-lg top-0 left-0 card-back w-full h-full bg-cardBack1"></div>
        <div class="absolute rounded-md top-0 left-0 card-back w-full h-full bg-cardBack2 scale-[90%]"></div>
        <div class="absolute rounded top-0 left-0 card-back w-full h-full bg-cardBack3 scale-[80%]"></div>
    </div>
    <div class="card-front">
        <div class="absolute rounded-lg top-0 left-0 card-back w-full h-full bg-cardFront1"></div>
        <div class="absolute rounded-md top-0 left-0 card-back w-full h-full bg-cardFront2 scale-[90%]"></div>
        <div class="absolute rounded top-0 left-0 card-back w-full h-full bg-cardFront3 scale-[80%]"></div>
        <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <i class="${content} text-4xl"></i>
        </div>
    </div>
</div>`;
};

const renderCards = () => {
    const gameDataShuffled = shuffle(gameData);

    return new Promise((resolve, reject) => {
        playContainer.innerHTML = gameDataShuffled.map(({ value, content }) => cardComps(content, value.toString())).join("");
        const listCards: NodeListOf<HTMLElement> = document.querySelectorAll(".card");

        let countOpenCard = 0;
        const handleHideCard = () => {
            countOpenCard = 0;
            return listCards.forEach((card) => card.classList.remove("open"));
        };

        listCards.forEach((card) => {
            card.addEventListener("click", () => {
                if (!card.className.includes("open")) {
                    if (countOpenCard === 2) {
                        handleHideCard();
                    }
                    card.classList.add("open");
                    countOpenCard++;
                } else {
                    card.classList.remove("open");
                    countOpenCard--;
                }
            });
        });

        return listCards;
    });
};

renderCards();
