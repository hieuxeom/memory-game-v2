const mongoose = require("mongoose");

const connectString = "mongodb://localhost:27017/memory-game"
// let connectString = "mongodb+srv://hieutnbedev:2FNz4Q9nmvWw7mHm@memory-game-v2.5dekfuw.mongodb.net/?retryWrites=true&w=majority&appName=memory-game-v2"
const connect = async () => {
	try {
		await mongoose.connect(connectString);
		console.log("Connect DB successfully");
	} catch (e) {
		console.log("Connect DB failure");
	}
};

module.exports = { connect };
