"use strict";
const minuteValue = document.getElementById("minuteValue");
const secondValue = document.getElementById("secondValue");
let totalTime = 0;
const handleTimer = () => {
    totalTime++;
    if (Math.floor(totalTime / 60) === 1) {
        handleStopTimer();
    }
    let second = pad(totalTime % 60);
    let minute = pad(Math.floor(totalTime / 60));
    minuteValue.innerHTML = minute.toString();
    secondValue.innerHTML = second.toString();
};
const handleStopTimer = () => {
    return clearInterval(timer);
};
const pad = (val) => {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
};
let timer = setInterval(handleTimer, 1000);
