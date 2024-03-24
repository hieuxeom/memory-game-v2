export var timeConverter = function (totalTime) {
    return {
        second: pad(totalTime % 60),
        minute: pad(Math.floor(totalTime / 60))
    };
};
var pad = function (val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
};
var Timer = /** @class */ (function () {
    function Timer(_a) {
        var minuteElement = _a.minuteElement, secondElement = _a.secondElement, totalTime = _a.totalTime, handlerStop = _a.handlerStop;
        this.minuteElement = minuteElement;
        this.secondElement = secondElement;
        this.totalTime = totalTime;
        this.handlerStop = handlerStop;
        console.log(this.totalTime);
    }
    Timer.prototype.start = function () {
        console.log("start");
        this.timer = setInterval(this.handleTimer.bind(this), 1000);
    };
    Timer.prototype.stop = function () {
        this.handlerStop();
        clearInterval(this.timer);
    };
    ;
    Timer.prototype.handleTimer = function () {
        if (this.totalTime > 0) {
            this.totalTime -= 1;
            var _a = timeConverter(this.totalTime), minute = _a.minute, second = _a.second;
            this.minuteElement.innerHTML = minute;
            this.secondElement.innerHTML = second;
            this.secondElement.dataset.time = this.totalTime.toString();
        }
        else {
            this.stop();
        }
    };
    Timer.prototype.getCurrentTime = function () {
        return this.totalTime;
    };
    return Timer;
}());
export { Timer };
