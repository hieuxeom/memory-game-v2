const userModel = require("../../models/UserModel");

class ApiUserController {
	async getAllUsers(req, res, next) {
		return res.json(await userModel.find({}));
	}

	async getUserById(req, res, next) {
		const { userId } = req.params;

		return res.json(await userModel.findById(userId));
	}
}

module.exports = new ApiUserController();
