var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
    playername: String,
    score: Number,
    difficulty: String
});

module.exports = mongoose.model("Player", playerSchema);