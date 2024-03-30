const cardThemeModel = require("../../models/CardThemeModel");
const { Alphabets } = require("../../utils/alphabets");
const gameThemeModel = require("../../models/GameThemeModel");

class ApiCardThemeController {
    async getWithFilter(req, res, next) {

        const { filter, _s } = req.query

        if (_s) {
            const cardData = await cardThemeModel.find({
                themeName: {
                    $regex: new RegExp(_s, 'i')
                }
            })
            if (cardData.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: `Successfully received ${cardData.length} card themes`,
                    data: cardData
                });
            } else {
                console.log("cc")
                return res.status(204).json({
                    status: "success",
                    message: "The request has been processed but there is no card themes to return",
                });
            }

        }

        const cardData = await cardThemeModel.find({});

        switch (filter) {
            case "alphabets":
                let results = [];
                for (let x of Alphabets) {
                    let regexFilter = new RegExp(`^[${x}${x.toLowerCase()}]`);
                    results.push({
                        title: x,
                        data: cardData.filter((card) => regexFilter.test(card.themeName))
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: `Successfully received ${cardData.length} card themes sorted by A - Z`,
                    data: results
                });

            default:
                return res.status(200).json({
                    status: "success",
                    message: `Successfully received ${cardData.length} card themes`,
                    data: cardData
                });
        }
    }

    async getThemeById(req, res, next) {

        const { themeId } = req.params;

        const cardThemeData = await cardThemeModel.findById(themeId);
        return res.status(200).json({
            status: "success",
            message: `Successfully received data of _id = ${cardThemeData._id}`,
            data: cardThemeData
        })
    }

    async post(req, res, next) {
        const { themeName, isVip } = req.body;
        let { cardFront, cardBack } = req.files;

        cardFront = cardFront[0];
        cardBack = cardBack[0];

        const newCardTheme = new cardThemeModel({
            themeName,
            cardFront: cardFront.filename,
            cardBack: cardBack.filename,
            isVip: isVip === "true",
        });

        const createNewCardTheme = await newCardTheme.save();

        if (createNewCardTheme) {
            return res.status(201).json({
                status: "success",
                message: "New card theme created successfully"
            })
        } else {
            return res.status(503).json({
                status: "error",
                message: "There is a problem from the server",
                error: {
                    name: err.name,
                    message: err.message
                }
            })
        }
    }

    async put(req, res, next) {
        try {
            const { themeId, themeName, isVip } = req.body;

            let { cardFront, cardBack } = req.files;

            let updateData = {
                themeName,
                isVip: isVip === "true"
            };

            if (cardFront) {
                updateData = {
                    ...updateData,
                    cardFront: cardFront[0].filename,
                };
            }
            if (cardBack) {
                updateData = {
                    ...updateData,
                    cardBack: cardBack[0].filename,
                };
            }

            const updateCardTheme = await cardThemeModel.findByIdAndUpdate(themeId, updateData);

            if (updateCardTheme) {
                return res.status(303).json({
                    status: "redirect",
                    url: "/admin/card-themes/all"
                })
            } else {
                return res.status(503).json({
                    status: "error",
                    message: "There is a problem from the server",
                })
            }
        } catch (err) {
            return res.status(503).json({
                status: "error",
                message: "There is a problem from the server",
                error: {
                    name: err.name,
                    message: err.message
                }
            })
        }
    }

    async delete(req, res, next) {
        try {
            const { themeId } = req.params;

            console.log(themeId);
            const deleteCardTheme = await cardThemeModel.findByIdAndDelete(themeId);
            if (deleteCardTheme) {
                return res.redirect(`/admin/card-themes/all`);
            } else {
                return res.status(400).json({
                    message: "Bad request",
                    description: "Have some problems",
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: "Bad request",
                description: err.message,
            });
        }
    }
}

module.exports = new ApiCardThemeController();
