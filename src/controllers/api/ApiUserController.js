const userModel = require("../../models/UserModel");
const historyGameModel = require("../../models/HistoryGameModel")
class ApiUserController {
	async getAllUsers(req, res, next) {
		return res.json(await userModel.find({}));
	}

	async getUserById(req, res, next) {
		const { userId } = req.params;

		return res.json(await userModel.findById(userId));
	}

	async getPlayerGameHistory(req, res, next) {
		const { userId } = req.params;

		return res.json(await historyGameModel.find({userId}).sort({createdAt: -1}))
	}
}

module.exports = new ApiUserController();
