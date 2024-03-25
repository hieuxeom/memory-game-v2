const historyGameModel = require("../../models/HistoryGameModel")
const userModel = require("../../models/UserModel")

class ApiRankController {
    async get(req, res, next) {
        let listIdTop = await historyGameModel.find().sort({
            gameScore: -1
        }).distinct("userId");

        let listTop = await Promise.all(listIdTop.map(async (id) => {
            let user = {};
            const gameData = await historyGameModel.findOne({
                userId: id
            }).sort({ gameScore: -1 });
            user.gameScore = gameData.gameScore;
            if (!gameData.userId.includes("guestPlayer")) {
                const userData = await userModel.findById(gameData.userId);
                user.displayName = userData.displayName;
            } else {
                user.displayName = id;
            }
            return user;
        }));

        res.status(200).json(listTop);
    }
}

module.exports = new ApiRankController();