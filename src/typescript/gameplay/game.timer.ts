const minuteValue: HTMLElement = document.getElementById("minuteValue") as HTMLElement;
const secondValue: HTMLElement = document.getElementById("secondValue") as HTMLElement;

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

const pad = (val: number) => {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
};

let timer = setInterval(handleTimer, 1000);
