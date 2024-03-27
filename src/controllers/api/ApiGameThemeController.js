const gameThemeModel = require("../../models/GameThemeModel");

class ApiGameThemeController {
    async getAllGameThemes(req, res, next) {
        return res.json(await gameThemeModel.find({}));
    }

    async getThemeById(req, res, next) {
        const { gameThemeId } = req.params;

        return res.json(await gameThemeModel.findById(gameThemeId));
    }

    async post(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "Please add game theme thumbnail",
                });
            }

            const { filename } = req.file;
            let { themeName, themeDataParsed, rawData, themeDataType } = req.body;

            if (!themeDataParsed) {
                return res.status(400).json({
                    message: "Theme data is empty",
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

            return res.redirect("/admin/game-themes/all");
        } catch (err) {
            return res.status(400).json({
                message: "Bad request",
                description: err.message,
            });
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

            const editGameTheme = await gameThemeModel.findByIdAndUpdate(themeId, updateData)

            if (editGameTheme) {
                return res.redirect(`/admin/game-themes/${themeId}`);
            }
        } catch (err) {
            return res.status(400).json({
                message: "Bad request",
                description: err.message,
            });
        }
    }

    async delete(req, res, next) {
        try {
            const { themeId } = req.params;

            const deleteTheme = await gameThemeModel.findByIdAndDelete(themeId).then()
            if (deleteTheme) {
                return res.redirect("/admin/game-themes/all")
            } else {
                return res.status(400).json({
                    message: "Bad request",
                })
            }
        } catch (err) {
            return res.status(400).json({
                message: "Bad request",
                description: err.message
            })
        }
    }
}

module.exports = new ApiGameThemeController();
