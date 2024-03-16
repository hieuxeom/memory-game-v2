const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GameSchemaSchema = new Schema(
	{
		themeName: String,
		themeData: [
			{
				icon: String,
				value: String,
				type: String,
			},
		],
		played: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("gameTheme", GameSchemaSchema);
