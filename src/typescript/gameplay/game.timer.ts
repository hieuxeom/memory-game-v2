const minuteValue: HTMLElement = document.getElementById("minuteValue") as HTMLElement;
const secondValue: HTMLElement = document.getElementById("secondValue") as HTMLElement;

let totalTime = 0;

const handleTimer = () => {
    totalTime++;

    // let second = pad(totalTime % 60);
    // let minute = pad(Math.floor(totalTime / 60));
    const {minute, second} = timeConverter(totalTime)
    minuteValue.innerHTML = minute;
    secondValue.innerHTML = second;
};

export const timeConverter = (totalTime: number) => {
    return {
        second: pad(totalTime % 60),
        minute: pad(Math.floor(totalTime / 60))
    }
}

export const handleStopTimer = () => {
    clearInterval(timer);
    return totalTime;
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
