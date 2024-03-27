const UserModel = require("../models/UserModel.js");

class AuthController {
    constructor() {
        this.app = require("../utils/firebase.js");
    }

    index(req, res, next) {
        return res.render("auth/index", {
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

    loginWithPassword(req, res, next) {
        return res.render("auth/login-password", {
            containerId: "authContainer",
            class: "px-8 py-2",
            listScripts: [
                {
                    path: "/auth/login.password.js",
                    type: "module",
                },
            ],
        })
    }

    register(req, res,next){
        return res.render("auth/register", {
            containerId: "authContainer",
            class: "px-8 py-2",
            listScripts: [
                {
                    path: "/auth/register.js",
                    type: "module",
                },
            ],
        })
    }
}

module.exports = new AuthController();
