"use strict";
var minuteValue = document.getElementById("minuteValue");
var secondValue = document.getElementById("secondValue");
var totalTime = 0;
var handleTimer = function () {
    totalTime++;
    if (Math.floor(totalTime / 60) === 1) {
        handleStopTimer();
    }
    var second = pad(totalTime % 60);
    var minute = pad(Math.floor(totalTime / 60));
    minuteValue.innerHTML = minute.toString();
    secondValue.innerHTML = second.toString();
};
var handleStopTimer = function () {
    return clearInterval(timer);
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
