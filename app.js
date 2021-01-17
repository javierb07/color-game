'use strict';

var express        = require("express"),
    app            = express(),
    mongoose       = require("mongoose"),
    Player         = require("./models/player"),
    methodOverride = require("method-override"),
    bodyParser     = require('body-parser');

// App configuration
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Automatically parse request body as form data.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Set up default mongoose connection
const host = process.env.HOST || "mongodb://localhost:27017/color-game";
mongoose.connect(host,{ useNewUrlParser: true ,useUnifiedTopology: true}, function(err){
    if (err){
        console.log("Conection error to database")
    } else {
        console.log("Connected to database")
    }
});
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Landing route
app.get('/', function(req,res){
    res.render("index");
});

// Game route
app.post('/color-game', function(req,res){
    var newPlayer = {
        playername: req.body.playername,
        score: 0
    }
    Player.create(newPlayer, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            // Redirect to play the game
            res.render("game", {player: newlyCreated});
        } 
    });
});

// Update database on game end
app.put('/color-game', function(req,res){
    const obj = JSON.parse(JSON.stringify(req.body));
    var player = {
        name: obj["data[playerName]"],
        score: obj["data[score]"],
        difficulty: obj["data[difficulty]"],
    }
    let id = obj["data[id]"];
    Player.findByIdAndUpdate(id, player, function(err, updated){
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            // Redirect to play the game
            res.redirect("/scores");
        } 
    });
});

// Highscores route
app.get('/scores', function(req,res){
    Player.find({}, function(err, players){
        if(err){
            req.flash("error", "Problem finding players in database");
            console.log(err);
            res.render("error", {error: err});
        } else {
            let playersEasy = players.filter(obj => {return obj.difficulty === "easy"});
            playersEasy.sort((a, b) => { return b.score - a.score; });
            let playersNormal = players.filter(obj => {return obj.difficulty === "normal"});
            playersNormal.sort((a, b) => { return b.score - a.score; });
            let playersHard = players.filter(obj => {return obj.difficulty === "hard"});
            playersHard.sort((a, b) => { return b.score - a.score; });
            res.render("scores", {playersEasy: playersEasy, playersNormal: playersNormal, playersHard: playersHard});
        }
    })
});
app.put('/scores', function(req,res){
    Player.find({}, function(err, players){
        if(err){
            req.flash("error", "Problem finding players in database");
            console.log(err);
            res.render("error", {error: err});
        } else {
            let playersEasy = players.filter(obj => {return obj.difficulty === "easy"});
            playersEasy.sort((a, b) => { return b.score - a.score; });
            let playersNormal = players.filter(obj => {return obj.difficulty === "normal"});
            playersNormal.sort((a, b) => { return b.score - a.score; });
            let playersHard = players.filter(obj => {return obj.difficulty === "hard"});
            playersHard.sort((a, b) => { return b.score - a.score; });
            res.render("scores", {playersEasy: playersEasy, playersNormal: playersNormal, playersHard: playersHard});
        }
    })
});

// Catch all other routes
app.get('/*', function(req,res){
    res.redirect("/");
});
const port = process.env.PORT || 80;

app.listen(port, function(err){
    if (err){
        console.log("Something went wrong.");
    } else {
        console.log("Server is running.");
    }
});