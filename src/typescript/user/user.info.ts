import {IUser} from "../type/user";

let userData: IUser = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) : "";

const userAvatar: HTMLImageElement = document.getElementById("userAvatar") as HTMLImageElement;
const displayNameValue: HTMLElement = document.getElementById("displayName") as HTMLElement;
const gamePlayedValue: HTMLElement = document.getElementById("gamePlayed") as HTMLElement;
const bestTimeValue: HTMLElement = document.getElementById("highestScore") as HTMLElement;
const averageTimeValue: HTMLElement = document.getElementById("averageScore") as HTMLElement;
const emailValue: HTMLElement = document.getElementById("email") as HTMLElement;
const mostPlayedSizeValue: HTMLElement = document.getElementById("mostPlayedSize") as HTMLElement
const mostPlayedTimeValue: HTMLElement = document.getElementById("mostPlayedTime") as HTMLElement

function isIUser(userData: IUser | string): userData is IUser {
    return (userData as IUser)._id !== undefined;
}

if (isIUser(userData)) {
    const {_id} = userData;
    fetch(`/api/users/${_id}`)
        .then((res) => res.json())
        .then((res: IUser) => {
            const {averageScore, highestScore, displayName, email, gamePlayed, photoURL, mostPlayedSize, mostPlayedTime} = res;
            userAvatar.src = photoURL;
            displayNameValue.innerHTML = displayName;
            gamePlayedValue.innerHTML = gamePlayed.toString();
            bestTimeValue.innerHTML = highestScore.toString();
            averageTimeValue.innerHTML = averageScore.toFixed(2);
            emailValue.innerHTML = email;
            mostPlayedSizeValue.innerHTML = mostPlayedSize
            mostPlayedTimeValue.innerHTML = mostPlayedTime.toString();
        });
} else {
    window.location.href = "/auth";
}
