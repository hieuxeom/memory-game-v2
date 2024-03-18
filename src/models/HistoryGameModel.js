const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const HistoryGameSchema = new Schema(
	{
		userId: { type: String, required: true },
		gameThemeId: { type: String, required: true },
		cardThemeId: { type: String, required: true },
		gameTime: { type: Number, required: true },
		gameSize: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("historyGame", HistoryGameSchema);
