const gameThemeModel = require("../../models/GameThemeModel");
const cardThemeModel = require("../../models/CardThemeModel");
const { Alphabets } = require("../../utils/alphabets");

class ApiGameThemeController {
    async getAllGameThemes(req, res, next) {
        // return res.json(await gameThemeModel.find({}));
        const { filter } = req.query
        const gameThemeData = await gameThemeModel.find({});

        switch (filter) {
            case "alphabets":
                let results = [];
                for (let x of Alphabets) {
                    let regexFilter = new RegExp(`^[${x}${x.toLowerCase()}]`);
                    results.push({
                        title: x,
                        data: gameThemeData.filter((card) => regexFilter.test(card.themeName))
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: `Successfully received ${gameThemeData.length} game themes sorted by A - Z`,
                    data: results
                });

            default:
                return res.status(200).json({
                    status: "success",
                    message: `Successfully received ${gameThemeData.length} game themes`,
                    data: gameThemeData
                });
        }
    }

    async getThemeById(req, res, next) {
        const { gameThemeId } = req.params;

        const gameThemeData = await gameThemeModel.findById(gameThemeId);
        return res.status(200).json({
            status: "success",
            message: `Successfully received data of _id = ${gameThemeData._id}`,
            data: gameThemeData
        })
    }

    async post(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: "fail",
                    message: "Theme Thumbnail is required",
                });
            }

            const { filename } = req.file;
            let { themeName, themeDataParsed, rawData, themeDataType } = req.body;

            if (!themeDataParsed) {
                return res.status(400).json({
                    status: "fail",
                    message: "Theme Data is required",
                });
            }

            const newGameTheme = new gameThemeModel({
                    themeName: themeName,
                    themeData: JSON.parse(themeDataParsed),
                    rawData: rawData,
                    themeThumbnail: filename,
                    type: themeDataType
                })
            ;

            await newGameTheme.save();

            // return res.redirect("/admin/game-themes/all");
            return res.status(201).json({
                status: "success",
                message: "New game theme successfully created"
            })
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

    async put(req, res, next) {
        try {

            let { themeId, themeName, themeDataParsed, rawData, themeDataType } = req.body;

            let updateData = {
                themeName: themeName,
                themeData: JSON.parse(themeDataParsed),
                rawData: rawData,
                type: themeDataType
            }

            if (req.file) {
                updateData = {
                    ...updateData,
                    themeThumbnail: req.file.filename,
                }
            }

            const editStatus = await gameThemeModel.findByIdAndUpdate(themeId, updateData)

            if (editStatus) {
                return res.status(303).json({
                    status: "redirect",
                    url: `/admin/game-themes/${themeId}`
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

            const deleteStatus = await gameThemeModel.findByIdAndDelete(themeId);

            if (deleteStatus) {
                // return res.redirect("/admin/game-themes/all")
                return res.status(303).json({
                    status: "redirect",
                    url: "/admin/game-themes/all"
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
}

module.exports = new ApiGameThemeController();
