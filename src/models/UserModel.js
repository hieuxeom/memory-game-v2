const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
    {
        displayName: String,
        email: String,
        photoURL: String,
        provider: String,
        highestScore: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
        mostPlayedSize: { type: String },
        mostPlayedTime: { type: Number },
        gamePlayed: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
