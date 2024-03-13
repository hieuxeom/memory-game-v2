const mongoose = require("mongoose");

const connect = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/memory-game");
		console.log("Connect DB successfully");
	} catch (e) {
		console.log("Connect DB failure");
	}
};

module.exports = { connect };
