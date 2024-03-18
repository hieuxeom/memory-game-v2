class UserController {
	index(req, res) {
		return res.render("user/index", {
			containerId: "authContainer",
			class: "px-8 py-2",
			listScripts: [
				{
					path: "user/user.info.js",
					type: "module",
				},
				{
					path: "auth/signout.google.js",
					type: "module",
				},
			],
		});
	}
}

module.exports = new UserController();
