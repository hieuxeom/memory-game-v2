var minuteValue = document.getElementById("minuteValue");
var secondValue = document.getElementById("secondValue");
var totalTime = 0;
var handleTimer = function () {
    totalTime++;
    // let second = pad(totalTime % 60);
    // let minute = pad(Math.floor(totalTime / 60));
    var _a = timeConverter(totalTime), minute = _a.minute, second = _a.second;
    minuteValue.innerHTML = minute;
    secondValue.innerHTML = second;
};
export var timeConverter = function (totalTime) {
    return {
        second: pad(totalTime % 60),
        minute: pad(Math.floor(totalTime / 60))
    };
};
export var handleStopTimer = function () {
    clearInterval(timer);
    return totalTime;
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
var timer = setInterval(handleTimer, 1000);
