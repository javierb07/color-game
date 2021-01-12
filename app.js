var express = require("express"),
    app     = express(),
    mysql   = require('mysql');



// Landing route
app.get('/', function(req,res){
    res.render("index");
});

// Game route
app.get('/color-game', function(req,res){
    res.render("game");
});

// Highscores route
app.get('/scores', function(req,res){
    res.render("scores");
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