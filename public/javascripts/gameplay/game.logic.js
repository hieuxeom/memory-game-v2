import { gameSize } from "../type/general.js";
import { handleStopTimer } from "./game.timer.js";
var sizeGame = gameSize === "4x4" ? 16 : 20;
export var gameLogic = function (listCards) {
    var countOpenCard = 0;
    var compareValue = [];
    var handleHideCard = function () {
        countOpenCard = 0;
        compareValue = [];
        return listCards.forEach(function (card) {
            if (!card.className.includes("matched"))
                card.classList.remove("open");
        });
    };
    listCards.forEach(function (card) {
        card.addEventListener("click", function () {
            if (countOpenCard < 2) {
                if (!card.className.includes("open")) {
                    countOpenCard++;
                    card.classList.add("open");
                    compareValue.push(card);
                    if (countOpenCard === 2) {
                        console.log(isMatch(compareValue));
                        if (isMatch(compareValue)) {
                            compareValue.forEach(function (e) { return e.classList.add("matched"); });
                            compareValue = [];
                            countOpenCard = 0;
                            if (document.querySelectorAll(".matched").length === sizeGame) {
                                var gameTime = handleStopTimer();
                                console.log("🚀 ~ card.addEventListener ~ gameTime:", gameTime);
                            }
                        }
                        else {
                            setTimeout(function () {
                                handleHideCard();
                            }, 500);
                        }
                    }
                }
                else {
                    countOpenCard--;
                    compareValue = [];
                    card.classList.remove("open");
                }
            }
        });
    });
};
var isMatch = function (_a) {
    var v1 = _a[0], v2 = _a[1];
    return v1.getAttribute("data-value") === v2.getAttribute("data-value");
};
