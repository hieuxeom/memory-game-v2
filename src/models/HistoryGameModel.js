const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const HistoryGameSchema = new Schema(
	{
		userId: String,
		gameThemeId: String,
		cardThemeId: String,
		gameTime: Number,
		gameSize: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("historyGame", HistoryGameSchema);
