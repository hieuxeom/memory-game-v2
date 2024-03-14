var _a, _b;
function shuffle(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
export var gameSize = localStorage.getItem("gameSize");
var gameData = [
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
var gameContainer = (_a = document.getElementById("gameContainer")) !== null && _a !== void 0 ? _a : null;
var size = localStorage.getItem("difficult") === "4x4" ? 16 : 20;
var themeId = (_b = localStorage.getItem("cardTheme")) !== null && _b !== void 0 ? _b : "";
var cardComps = function (cardBack, cardFront, content, value) {
    return "<div class=\"card relative shadow-lg h-[".concat(gameSize === "4x4" ? "170" : "135", "px] rounded-lg overflow-hidden\" data-value=\"").concat(value, "\">\n    <div class=\"card-back h-full\">\n        <img src=\"/images/themepacks/").concat(cardBack, "\" class=\"w-full h-full\"/>\n    </div>\n    <div class=\"card-front w-full h-full\">\n\t\t<div>\n\t\t\t<img src=\"/images/themepacks/").concat(cardFront, "\" class=\"w-full h-full\"/>\n\t\t</div>\n\t\t<div class=\"absolute top-0 left-0 bg-white w-auto h-full shadow-lg\"></div>\n        <div class=\"absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]\">\n            <i class=\"").concat(content, " text-4xl\"></i>\n        </div>\n    </div>\n</div>");
};
var renderCards = function () {
    var gameDataShuffled = shuffle(gameData);
    gameDataShuffled.length = gameSize === "4x5" ? 20 : 16;
    return new Promise(function (resolve, reject) {
        fetch("/api/themes/".concat(themeId))
            .then(function (res) { return res.json(); })
            .then(function (themeData) {
            var cardBack = themeData.cardBack, cardFront = themeData.cardFront;
            gameContainer.innerHTML = gameDataShuffled
                .map(function (_a) {
                var value = _a.value, content = _a.content;
                return cardComps(cardBack, cardFront, content, value.toString());
            })
                .join("");
            var listCards = document.querySelectorAll(".card");
            var countOpenCard = 0;
            var handleHideCard = function () {
                countOpenCard = 0;
                return listCards.forEach(function (card) { return card.classList.remove("open"); });
            };
            listCards.forEach(function (card) {
                card.addEventListener("click", function () {
                    if (!card.className.includes("open")) {
                        if (countOpenCard === 2) {
                            handleHideCard();
                        }
                        card.classList.add("open");
                        countOpenCard++;
                    }
                    else {
                        card.classList.remove("open");
                        countOpenCard--;
                    }
                });
            });
            return listCards;
        });
    });
};
renderCards();
