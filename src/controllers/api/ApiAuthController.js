const userModel = require("../../models/UserModel");

class ApiAuthController {
	async loginWithGoogle(req, res, next) {
		const userData = req.body;
		console.log("🚀 ~ AuthController ~ loginWithGoogle ~ userData:", userData);

		const existUser = await userModel.findOne({
			email: userData.email,
		});

		if (existUser) {
			return res.json(existUser);
		} else {
			const newUser = new userModel(userData);

			const newUserData = await newUser
				.save()
				.then((user) => console.log("New user has been created."))
				.catch((err) => {
					console.log("cc");
				});

			return res.json(newUserData);
		}
	}
}

module.exports = new ApiAuthController();
