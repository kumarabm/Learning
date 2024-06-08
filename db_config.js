const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Learning", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000, // Set socket timeout to 30 seconds
    serverSelectionTimeoutMS: 30000 // Set server selection timeout to 30 seconds
});
const db = mongoose.connection;

db.on("error", () => {

    console.error.bind(console, "Database connection error");
});

db.once("open", () => {

    console.info("Database connected successfully");
});

module.exports = db;
