var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Card = /** @class */ (function () {
    function Card(cardBack, cardFront) {
        this.cardBack = cardBack;
        this.cardFront = cardFront;
    }
    Card.prototype.render = function () {
        return "<div class=\"card relative shadow-lg h-[170px] rounded-lg overflow-hidden\">\n                    <div class=\"card-back h-full\">\n                        <img src=\"/images/themepacks/".concat(this.cardBack, "\" class=\"w-full h-full\" alt=\"cardBack\"/>\n                    </div>\n                    <div class=\"card-front w-full h-full\">\n                        <div>\n                            <img src=\"/images/themepacks/").concat(this.cardFront, "\" class=\"w-full h-full\" alt=\"cardBack\"/>\n                        </div>\n                    </div>\n                </div>");
    };
    return Card;
}());
export { Card };
var GameCard = /** @class */ (function (_super) {
    __extends(GameCard, _super);
    function GameCard(_a) {
        var cardFront = _a.cardFront, cardBack = _a.cardBack, icon = _a.icon, value = _a.value;
        var _this = _super.call(this, cardBack, cardFront) || this;
        _this.icon = icon;
        _this.value = value;
        return _this;
    }
    GameCard.prototype.getValue = function () {
        return this.value;
    };
    GameCard.prototype.render = function (isNormal) {
        return "<div data-value=\"".concat(this.getValue(), "\"\n                    class=\"card relative shadow-lg h-[").concat(isNormal ? "170" : "135", "px] rounded-lg overflow-hidden\"\n                >\n                    <div class=\"card-back h-full\">\n                        <img src=\"/images/themepacks/").concat(this.cardBack, "\" class=\"w-full h-full\" alt=\"\"/>\n                    </div>\n                    <div class=\"card-front w-full h-full\">\n                        <div>\n                            <img src=\"/images/themepacks/").concat(this.cardFront, "\" class=\"w-full h-full\" alt/>\n                        </div>\n                        <div class=\"absolute top-0 left-0 bg-white w-auto h-full shadow-lg\"></div>\n                        <div class=\"absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]\">\n                            <i class=\"").concat(this.icon, " text-4xl\"></i>\n                        </div>\n                    </div>\n                </div>");
    };
    return GameCard;
}(Card));
export { GameCard };
var CardThemeCard = /** @class */ (function (_super) {
    __extends(CardThemeCard, _super);
    function CardThemeCard(_a) {
        var cardBack = _a.cardBack, themeName = _a.themeName, _id = _a._id;
        var _this = _super.call(this, cardBack) || this;
        _this.unSelectedCurrentActiveCard = function () {
            var listCardThemes = document.querySelectorAll(".theme-card");
            console.log(listCardThemes);
            listCardThemes.forEach(function (card) {
                card.classList.remove("selected");
            });
        };
        _this.themeName = themeName;
        _this._id = _id;
        return _this;
    }
    CardThemeCard.prototype.render = function (isSelected) {
        return "<div id=\"themeCard".concat(this._id, "\" data-value=").concat(this._id, "\n                    class=\"theme-card ").concat(isSelected ? "selected" : "", " w-full max-h-[145px] bg-white shadow shadow-lg rounded-xl overflow-hidden\"\n                >\n                    <img class=\"h-full w-full\" src=\"/images/themepacks/").concat(this.cardBack, "\" alt=\"").concat(this.themeName, " Card Theme\"/>\n                </div>");
    };
    CardThemeCard.prototype.setSelectEvent = function () {
        var _this = this;
        var element = document.getElementById("themeCard".concat(this._id));
        if (element) {
            element.addEventListener('click', function () {
                var _a;
                _this.unSelectedCurrentActiveCard();
                element.classList.add("selected");
                localStorage.setItem("cardTheme", (_a = element.getAttribute("data-value")) !== null && _a !== void 0 ? _a : "");
            });
        }
    };
    return CardThemeCard;
}(Card));
export { CardThemeCard };
var GameThemeCard = /** @class */ (function (_super) {
    __extends(GameThemeCard, _super);
    function GameThemeCard(_a) {
        var themeThumbnail = _a.themeThumbnail, themeName = _a.themeName, _id = _a._id;
        var _this = _super.call(this, themeThumbnail) || this;
        _this.unSelectedCurrentActiveCard = function () {
            var listGameThemes = document.querySelectorAll(".theme-game");
            console.log(listGameThemes);
            listGameThemes.forEach(function (card) {
                card.classList.remove("selected");
            });
        };
        _this.themeName = themeName;
        _this._id = _id;
        return _this;
    }
    GameThemeCard.prototype.render = function (isSelected) {
        return "<div class=\"flex flex-col justify-center items-center gap-2\">\n                    <div id=\"themeGame".concat(this._id, "\" \n                        data-value=").concat(this._id, " \n                        class=\"theme-game ").concat(isSelected ? "selected" : "", " w-full max-h-[145px] bg-white shadow shadow-lg  overflow-hidden\"\n                        >\n                        <img src=\"/images/game_thumbnails/").concat(this.cardBack, "\" alt=\"").concat(this.themeName, " Card Theme\"/>\n                    </div>\n                    <p class=\"text-xl text-secondary\">").concat(this.themeName, "</p>\n                </div>");
    };
    GameThemeCard.prototype.setSelectEvent = function () {
        var _this = this;
        var element = document.getElementById("themeGame".concat(this._id));
        if (element) {
            element.addEventListener('click', function () {
                var _a;
                _this.unSelectedCurrentActiveCard();
                element.classList.add("selected");
                localStorage.setItem("gameTheme", (_a = element.getAttribute("data-value")) !== null && _a !== void 0 ? _a : "");
            });
        }
    };
    return GameThemeCard;
}(Card));
export { GameThemeCard };
