const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CardThemeSchema = new Schema(
	{
		themeName: String,
		cardFront: String,
		cardBack: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("cardTheme", CardThemeSchema);
