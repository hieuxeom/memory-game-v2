const cardThemeModel = require("../../models/CardThemeModel");
const { Alphabets } = require("../../utils/alphabets");

class ApiCardThemeController {
    async getWithFilter(req, res, next) {

        const { filter } = req.query
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
                    mesage: `Successfully received ${cardData.length} card themes`,
                    data: cardData
                });
        }
    }

    async getThemeById(req, res, next) {
        const { themeId } = req.params;
        return res.status(200).json(await cardThemeModel.findById(themeId));
    }

    async post(req, res, next) {
        const { themeName } = req.body;
        let { cardFront, cardBack } = req.files;

        cardFront = cardFront[0];
        cardBack = cardBack[0];

        const newCardTheme = new cardThemeModel({
            themeName,
            cardFront: cardFront.filename,
            cardBack: cardBack.filename,
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
            const { themeId, themeName } = req.body;

            let { cardFront, cardBack } = req.files;

            let updateData = {
                themeName,
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
