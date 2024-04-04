import {IUser} from "../type/user";

let gameSize: string | null = localStorage.getItem("gameSize") ?? null;

if (!gameSize) {
    localStorage.setItem("gameSize", "4x4")
    gameSize = "4x4"
}

let gameTime: string | null = localStorage.getItem("gameTime") ?? null;

let currentCardTheme: string | null = localStorage.getItem("cardTheme") ?? null;

let currentGameTheme = localStorage.getItem("gameTheme") ?? null;

const getDocumentCookies = () => {
    const cookies = document.cookie.split(";");

    const mapCookie = new Map();

    cookies.forEach(cookie => mapCookie.set(cookie.split("=")[0].trim(), cookie.split("=")[1]));

    return mapCookie;
}

const getListVipCards = (): string[] => {
    if (localStorage.getItem("userData")) {
        return (JSON.parse(localStorage.getItem("userData")!) as IUser).userVipItems.cardThemes;
    } else {
        return []
    }
}

const getListVipGames = (): string[] => {
    if (localStorage.getItem("userData")) {
        return (JSON.parse(localStorage.getItem("userData")!) as IUser).userVipItems.gameThemes;
    } else {
        return []
    }
}

export {
    gameSize,
    gameTime,
    currentCardTheme,
    currentGameTheme,
    getListVipCards,
    getListVipGames,
    getDocumentCookies
} ;
