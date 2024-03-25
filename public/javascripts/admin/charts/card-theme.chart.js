export const getCardThemeData = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/charts/card-themes")
            .then((res) => res.json())
            .then(result => {
                resolve(result)
            });
    });
};
