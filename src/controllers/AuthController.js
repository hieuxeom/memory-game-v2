const UserModel = require("../models/UserModel.js");

class AuthController {
	constructor() {
		this.app = require("../utils/firebase.js");
	}
	index(req, res, next) {
		res.render("auth/index", {
			containerId: "authContainer",
			class: "px-8 py-2",
			listScripts: [
				{
					path: "/auth/login.google.js",
					type: "module",
				},
			],
		});
	}
}

module.exports = new AuthController();
