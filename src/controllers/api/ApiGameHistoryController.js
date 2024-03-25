const historyGameModel = require("../../models/HistoryGameModel")

class ApiGameHistoryController {
    async get(req, res, next) {
        return res.status(200).json(await historyGameModel.find({}))
    }
}

module.exports = new ApiGameHistoryController();