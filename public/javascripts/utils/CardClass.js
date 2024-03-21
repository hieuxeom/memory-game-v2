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
    function Card(cardFront, cardBack) {
        this.cardFront = cardFront;
        this.cardBack = cardBack;
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
        var _this = _super.call(this, cardFront, cardBack) || this;
        _this.icon = icon;
        _this.value = value;
        return _this;
    }
    GameCard.prototype.getValue = function () {
        return this.value;
    };
    GameCard.prototype.render = function (isNormal) {
        return "<div data-value=\"".concat(this.getValue(), "\"\n                    class=\"card relative shadow-lg h-[").concat(isNormal ? "170" : "135", "px] rounded-lg overflow-hidden\"\n                >\n                    <div class=\"card-back h-full\">\n                        <img src=\"/images/themepacks/").concat(cardBack, "\" class=\"w-full h-full\" alt=\"\"/>\n                    </div>\n                    <div class=\"card-front w-full h-full\">\n                        <div>\n                            <img src=\"/images/themepacks/").concat(cardFront, "\" class=\"w-full h-full\" alt/>\n                        </div>\n                        <div class=\"absolute top-0 left-0 bg-white w-auto h-full shadow-lg\"></div>\n                        <div class=\"absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]\">\n                            <i class=\"").concat(this.icon, " text-4xl\"></i>\n                        </div>\n                    </div>\n                </div>");
    };
    return GameCard;
}(Card));
export { GameCard };
