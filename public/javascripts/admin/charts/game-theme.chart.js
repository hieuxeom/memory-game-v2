export const getGameThemeData = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/charts/game-themes")
            .then((res) => res.json())
            .then(result => {
                resolve(result)
            });
    });
};
