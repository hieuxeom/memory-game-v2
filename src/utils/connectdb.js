const mongoose = require("mongoose");

let connectionString = "";
if (process.env.NODE_ENV && process.env.NODE_ENV.includes("production")) {
    connectionString = "mongodb+srv://hieutnbedev:2FNz4Q9nmvWw7mHm@memory-game-v2.5dekfuw.mongodb.net/?retryWrites=true&w=majority&appName=memory-game-v2"
} else {
    connectionString = "mongodb://localhost:27017/memory-game"
}

const connect = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Connect DB successfully");
    } catch (e) {
        console.log("Connect DB failure");
    }
};

module.exports = { connect };
