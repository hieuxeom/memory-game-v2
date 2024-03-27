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

	history(req, res) {
		return res.render("user/history", {
			containerId: "siteContainer",
			class: "px-8 py-2",
			title: "Game History",
			buttonBackRef: "/user",
			listScripts: [
				{
					path: "user/history.generator.js",
					type: "module"
				}
			]
		})
	}

	changePassword(req,res) {
		return res.render("user/change-password", {
			containerId: "siteContainer",
			class: "px-8 py-2",
			title: "Change Password",
			buttonBackRef: "/user",
			listScripts: [
				{
					path: "user/change-pwd.js",
					type: "module"
				}
			]
		})
	}
}

module.exports = new UserController();
