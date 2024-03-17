const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const subThemeData = new Schema({
	icon: String,
	value: String,
	type: String,
});

const GameSchemaSchema = new Schema(
	{
		themeName: String,
		themeData: [subThemeData],
		played: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("gameTheme", GameSchemaSchema);
