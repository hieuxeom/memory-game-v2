export const getGameTimeData = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/charts/game-times")
            .then((res) => res.json())
            .then(result => {
                resolve(result)
            });
    });
};
