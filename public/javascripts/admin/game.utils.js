export const parseGameData = (gameData) => {
    return gameData.map((value) => {
        let tempString = value.split("|");
        if (tempString.length > 1) {
            return {
                icon: tempString[0],
                value: tempString[1],
            };
        }
        else {
            return {
                icon: tempString[0],
                value: tempString[0],
            };
        }
    });
};
