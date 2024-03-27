const userModel = require("../../models/UserModel");

const bcrypt = require("bcrypt")
const saltRounds = 10

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

    async credentialsRegister(req, res, next) {
        let userData = req.body;

        const existUser = await userModel.findOne({
            email: userData.email,
        });

        if (existUser) {
            return res.json({
                status: 204,
                message: "Failed",
                description: "Email already exists! Please try again with different email!"
            });
        } else {
            let bcryptPwd = await bcrypt.hash(userData.password, 10)
                .then(hash => {
                    return hash
                })
                .catch(err => console.error(err.message))

            userData = {
                ...userData,
                password: bcryptPwd
            }

            const newUser = new userModel(userData);

            const newUserData = await newUser.save();

            return res.status(201).json({
                status: 201,
                message: "OK",
                description: "Create new account successfully!"
            });
        }
    }

    async loginWithPassword(req, res, next) {
        const { uEmail, uPassword } = req.body;

        const databasePwd = await userModel.findOne({
            email: uEmail,
        }).select("password");

        if (databasePwd) {
            const userData = await userModel.findOne({
                email: uEmail,
            }).select("-password")

            const { password } = databasePwd;

            bcrypt
                .compare(uPassword, password)
                .then(check => {
                    console.log(check);

                    if (check) {
                        return res.json({
                            status: 200,
                            userData,
                        })
                    } else {
                        return res.json({
                            status: 204,
                            message: "Failed",
                            description: "Wrong password!"
                        })
                    }

                })
                .catch(err => {
                    console.log(err);
                    return res.status(203).json({
                        message: "Failed",
                        description: "Something went wrong"
                    })
                })
        } else {
            return res.status(400).json({
                message: "Fail",
                description: "Wrong email!"
            });
        }

    }

    async changePassword(req, res, next) {
        const { _id, oldPwd, newPwd } = req.body;

        const userData = await userModel.findOne({
            _id: _id
        });

        if (userData) {
            const { password } = userData
            bcrypt
                .compare(oldPwd, password)
                .then(check => {
                    if (check) {
                        bcrypt.hash(newPwd, 10)
                            .then(async (hash) => {
                                await userModel.findByIdAndUpdate(_id, {
                                    password: hash
                                });

                                return res.json({
                                    status: 200,
                                    message: "OK",
                                    description: "Change password successfully "
                                });
                            })
                            .catch(err => console.error(err.message))
                    } else {
                        return res.json({
                            status: 204,
                            message: "Failed",
                            description: "Wrong old password!"
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({
                        message: "Failed",
                        description: "Something went wrong"
                    })
                })
        }
    }
}

module.exports = new ApiAuthController();
