const userModel = require("../../models/UserModel");

class ApiAuthController {
	async loginWithGoogle(req, res, next) {
		const userData = req.body;

		const existUser = await userModel.findOne({
			email: userData.email,
		});

		if (existUser) {
			return res.status(203).json(existUser);
		} else {
			const newUser = new userModel(userData);

			const newUserData = await newUser.save();

			return res.status(201).json(newUserData);
		}
	}
}

module.exports = new ApiAuthController();
