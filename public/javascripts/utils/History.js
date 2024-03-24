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
var HistoryCard = /** @class */ (function () {
    function HistoryCard(_a) {
        var cardThemeId = _a.cardThemeId, gameThemeId = _a.gameThemeId, gameSize = _a.gameSize, gameTime = _a.gameTime, gameTurn = _a.gameTurn, gameScore = _a.gameScore, createdAt = _a.createdAt;
        this.cardThemeId = cardThemeId;
        this.gameThemeId = gameThemeId;
        this.gameSize = gameSize;
        this.createdAt = createdAt;
        this.gameTime = gameTime;
        this.gameTurn = gameTurn;
        this.gameScore = gameScore;
    }
    HistoryCard.prototype.convertTimeToString = function () {
    };
    HistoryCard.prototype.getCardThemeImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise((function (resolve, reject) {
                            fetch("/api/card-themes/".concat(_this.cardThemeId))
                                .then(function (res) { return res.json(); })
                                .then(function (res) {
                                resolve(res.cardBack);
                            });
                        }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HistoryCard.prototype.getGameThumbnail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise((function (resolve, reject) {
                            fetch("/api/game-themes/".concat(_this.gameThemeId))
                                .then(function (res) { return res.json(); })
                                .then(function (res) {
                                if (res) {
                                    resolve(res.themeThumbnail);
                                }
                                else {
                                    resolve("");
                                }
                            });
                        }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HistoryCard.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, time, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        date = new Date(this.createdAt);
                        time = "".concat(date.toLocaleTimeString("es-AR"), " ").concat(date.toLocaleDateString("es-AR"));
                        _c = (_b = "<div class=\"w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-max flex justify-between items-center gap-2 p-4 rounded-xl\">\n                    <div class=\"w-1/2 flex flex-col gap-2\">\n                        <p class=\"text-sm text-slate-500\">".concat(time, "</p>\n                        <div class=\"flex gap-2 items-center\">\n                            <p class=\"text-4xl text-header-shadow\">").concat(this.gameSize, "</p>\n                            <p class=\"text-4xl text-header-shadow\">-</p>\n                            <p class=\"text-6xl text-header-shadow\">").concat(this.gameScore, "</p>\n                        </div>\n                        <div class=\"flex gap-1 items-center\">\n                            <p class=\"text-primary\">").concat(this.gameTurn, "</p>\n                            <p>turns in</p>\n                            <p class=\"text-primary\">").concat(this.gameTime, "s</p>\n                        </div>\n                    </div>\n                    <div class=\"w-1/2 flex justify-center gap-2 items-center\">\n                        <img class=\"w-24\" src=\"/images/themepacks/")).concat;
                        return [4 /*yield*/, this.getCardThemeImage()];
                    case 1:
                        _d = (_a = _c.apply(_b, [_e.sent(), "\" alt=\"\">\n            \n                        <img class=\"w-24\" src=\"/images/game_thumbnails/"])).concat;
                        return [4 /*yield*/, this.getGameThumbnail()];
                    case 2: return [2 /*return*/, _d.apply(_a, [_e.sent(), "\" alt=\"\">\n            \n                    </div>\n                </div>"])];
                }
            });
        });
    };
    return HistoryCard;
}());
export { HistoryCard };
