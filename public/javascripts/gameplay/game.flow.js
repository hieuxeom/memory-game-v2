var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { renderGame } from "./game.generator.js";
import { Timer } from "../utils/Timer.js";
import { showNotifyBoard } from "./game.notify.js";
var selectTimeContainer = document.getElementById("selectGameTime");
var buttonStart = document.getElementById("startGame");
var handleUnSelectTime = function (listTimes) {
    return listTimes.forEach(function (button) { return button.classList.remove("active"); });
};
var selectTime = function () {
    var time = 0;
    if (selectTimeContainer) {
        var listTimes_1 = document.querySelectorAll("#selectGameTime .button-time");
        listTimes_1.forEach(function (button) {
            button.addEventListener("click", function () {
                var _a;
                localStorage.setItem("gameTime", (_a = button.getAttribute("data-button")) !== null && _a !== void 0 ? _a : "");
                handleUnSelectTime(listTimes_1);
                button.classList.add("active");
                return Number(button.getAttribute("data-button"));
            });
        });
    }
    return time;
};
var startGame = function () { return __awaiter(void 0, void 0, void 0, function () {
    var totalTime, minuteElement, secondElement, handlerStop, timer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                totalTime = localStorage.getItem("gameTime") ? Number(localStorage.getItem("gameTime")) : 0;
                minuteElement = document.getElementById("minuteValue");
                secondElement = document.getElementById("secondValue");
                localStorage.setItem("gameTurn", "0");
                handlerStop = function () {
                    var listCards = document.querySelectorAll(".card");
                    listCards.forEach(function (card) { return card.classList.add("disabled"); });
                    handleGameWin();
                };
                if (!(totalTime !== 0)) return [3 /*break*/, 2];
                console.log(totalTime);
                selectTimeContainer.style.display = "none";
                timer = new Timer({
                    minuteElement: minuteElement,
                    secondElement: secondElement,
                    totalTime: totalTime,
                    handlerStop: handlerStop
                });
                timer.start();
                return [4 /*yield*/, renderGame()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var handleGameWin = function () {
    var _a, _b, _c, _d;
    var _id = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData"))._id : null;
    console.log(_id);
    var gameThemeId = localStorage.getItem("gameTheme");
    var cardThemeId = localStorage.getItem("cardTheme");
    var gameSize = localStorage.getItem("gameSize");
    var gameTime = (_a = Number(localStorage.getItem("gameTime"))) !== null && _a !== void 0 ? _a : 0;
    var gameTurn = (_b = Number(localStorage.getItem("gameTurn"))) !== null && _b !== void 0 ? _b : 0;
    var gameScore = (_d = Number((_c = document.getElementById("score")) === null || _c === void 0 ? void 0 : _c.getAttribute("data-score"))) !== null && _d !== void 0 ? _d : 0;
    var historyData = {
        userId: _id !== null && _id !== void 0 ? _id : "guestPlayer".concat(Date.now()),
        gameThemeId: gameThemeId,
        cardThemeId: cardThemeId,
        gameTime: gameTime,
        gameSize: gameSize,
        gameScore: gameScore,
        gameTurn: gameTurn,
    };
    fetch("/game/results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(historyData),
    })
        .then(function (res) { return res.json(); })
        .then(function (log) { return console.log(log); });
    if (_id) {
        showNotifyBoard(gameScore);
    }
    else {
        showNotifyBoard(gameScore, false);
    }
};
var gameFlow = function () {
    selectTime();
    buttonStart.addEventListener("click", function () {
        startGame();
    });
};
gameFlow();
