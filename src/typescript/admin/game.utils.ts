import {IGameData} from "../type/gameTheme";

export const parseGameData = (gameData: string []) => {
    return gameData.map((value): IGameData => {
        let tempString = value.split("|");
        if (tempString.length > 1) {
            return {
                icon: tempString[0],
                value: tempString[1],
            };
        } else {
            return {
                icon: tempString[0],
                value: tempString[0],
            };
        }
    });
}