var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import { gameSize } from "../type/general.js";
var sizeGame = gameSize === "4x4" ? 16 : 20;
var gameContainer = (_a = document.getElementById("gameContainer")) !== null && _a !== void 0 ? _a : null;
var timer = document.getElementById("secondValue");
var scoreValue = document.getElementById("score");
function shuffleAndSlice(array, length) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    array.length = length / 2;
    return __spreadArray(__spreadArray([], array, true), array, true);
}
var getCurrentScore = function () {
    return Number(scoreValue.getAttribute("data-score"));
};
var setNewScore = function (newScore) {
    scoreValue.dataset.score = newScore.toString();
    return scoreValue.innerHTML = newScore.toString();
};
var calculateScore = function (turns) {
    if (turns >= 5) {
        return 50;
    }
    var score = 100;
    if (turns > 1 && turns < 5) {
        score -= (turns - 1) * 10;
    }
    return score;
};
var setTotalTurn = function (totalTurn) {
    return localStorage.setItem('gameTurn', totalTurn.toString());
};
export var gameLogic = function (listCards) {
    var countOpenCard = 0;
    var compareValue = [];
    var turnClick = 1;
    var totalTurn = localStorage.getItem('gameTurn') ? Number(localStorage.getItem('gameTurn')) : 0;
    var gameData = shuffleAndSlice(listCards, sizeGame);
    gameContainer.innerHTML = gameData.join("");
    var listOfCards = document.querySelectorAll(".card");
    var handleHideCard = function () {
        countOpenCard = 0;
        compareValue = [];
        return listOfCards.forEach(function (card) {
            if (!card.className.includes("matched"))
                card.classList.remove("open");
        });
    };
    listOfCards.forEach(function (card) {
        card.addEventListener("click", function () {
            if (countOpenCard < 2) {
                if (!card.className.includes("open")) {
                    countOpenCard++;
                    card.classList.add("open");
                    compareValue.push(card);
                    if (countOpenCard === 2) {
                        totalTurn++;
                        setTotalTurn(totalTurn);
                        if (isMatch(compareValue)) {
                            compareValue.forEach(function (e) {
                                e.style.visibility = 'hidden';
                                e.classList.add("matched");
                            });
                            setNewScore(getCurrentScore() + calculateScore(turnClick));
                            turnClick = 1;
                            compareValue = [];
                            countOpenCard = 0;
                            if (document.querySelectorAll(".matched").length === sizeGame && Number(timer.getAttribute("data-time")) > 0) {
                                setTimeout(function () { return gameLogic(listCards); }, 250);
                            }
                        }
                        else {
                            setTimeout(function () {
                                turnClick += 1;
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
    return listOfCards;
};
var isMatch = function (_a) {
    var v1 = _a[0], v2 = _a[1];
    return v1.getAttribute("data-value") === v2.getAttribute("data-value");
};
