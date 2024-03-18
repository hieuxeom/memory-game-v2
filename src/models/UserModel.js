const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
	{
		displayName: String,
		email: String,
		photoURL: String,
		provider: String,
		bestTime: { type: Number, default: 0 },
		averageTime: { type: Number, default: 0 },
		gamePlayed: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
