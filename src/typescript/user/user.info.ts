import { IUser } from "../type/user";

let userData: IUser = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) : "";

const userAvatar: HTMLImageElement = document.getElementById("userAvatar") as HTMLImageElement;
const displayNameValue: HTMLElement = document.getElementById("displayName") as HTMLElement;
const gamePlayedValue: HTMLElement = document.getElementById("gamePlayed") as HTMLElement;
const bestTimeValue: HTMLElement = document.getElementById("bestTime") as HTMLElement;
const averageTimeValue: HTMLElement = document.getElementById("averageTime") as HTMLElement;
const emailValue: HTMLElement = document.getElementById("email") as HTMLElement;

function isIUser(userData: IUser | string): userData is IUser {
	return (userData as IUser)._id !== undefined;
}

if (isIUser(userData)) {
	const { _id } = userData;
	fetch(`/api/users/${_id}`)
		.then((res) => res.json())
		.then((res: IUser) => {
			const { averageTime, bestTime, displayName, email, gamePlayed, photoURL } = res;
			userAvatar.src = photoURL;
			displayNameValue.innerHTML = displayName;
			gamePlayedValue.innerHTML = gamePlayed.toString();
			bestTimeValue.innerHTML = bestTime.toString();
			averageTimeValue.innerHTML = averageTime.toString();
			emailValue.innerHTML = email;
		});
} else {
	window.location.href = "/auth";
}
