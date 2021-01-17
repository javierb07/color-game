var numSquares = 6;
var colors = [];
var pickedColor;
var score = 0;
var extra = false;
var mode = "normal";
var corrects = 0;
var choices = 0;
var time = 30;
var squares = document.querySelectorAll(".square");
var buttons = document.querySelectorAll(".mode");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var timerDisplay = document.querySelector("#timer");
var scoreDisplay = document.querySelector("#score");
var h1 = document.querySelector("h1");
var startButton = document.querySelector("#start");
var modeButtons = document.querySelectorAll(".mode");
var playerName = document.getElementById("name").textContent;
var playerID = document.getElementById("id").textContent;
//Sound 
var wrongSound = document.getElementById("wrongSound");
var correctSound = document.getElementById("correctSound");
var selectSound = document.getElementById("selectSound");

init();

function init(){
	setupModeButtons();
	squares.forEach(element => element.style.display ="none");
}

function start(){
	squares.forEach(element => element.style.display ="block");
	selectSound.play();
	startButton.style.display ="none";
	modeButtons.forEach(element => {
		if(!element.classList.contains("selected")){
			element.style.display = "none";
		}
	});
	setupSquares();
	reset();
	var interval = setInterval(function(){
		if(time == 0){
			timerDisplay.textContent = "TIME OVER!";
			endGame();
			clearInterval(interval);
		} else {
			time--;
			timerDisplay.textContent = "TIME: " + time +"s";
		}
	;}, 1 * 1000);
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			selectSound.play();
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			switch (this.textContent) {
				case "Easy":
					numSquares = 3;
					mode = "easy";
					break;
				case "Normal":
					numSquares = 6;
					mode = "normal";
					break;
				case "Hard":
					numSquares = 9;
					mode = "hard";
					break;
			}
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				correctSound.play();
				score+=5+corrects;
				this.style.background = "#232323";
				h1.style.background = clickedColor;
				choices++;
				corrects++;
				reset();
				messageDisplay.textContent = "CORRECT!";
				scoreDisplay.textContent = "SCORE: " + score;
			} else {
				wrongSound.play();
				choices++;
				score--;
				corrects = 0;
				this.style.background = "#232323";
				messageDisplay.textContent = "WRONG!";
				scoreDisplay.textContent = "SCORE: " + score;
			}
		});
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

startButton.addEventListener("click", function(){
	start();
})

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function endGame(){
	removeSquares()
	var sendData = {playerName: playerName, score: score, difficulty: mode, id: playerID}
	console.log(sendData);
	$.ajax({
		url: window.location.href,    
		type: 'PUT',   //type is any HTTP method
		data: {
			data: sendData
		},      //Data as js object
		success: function () {
			setTimeout(() => {
				window.location.href = window.location.href.slice(0,window.location.href.length-11)+"/scores"; 
			}, 2000);
		}
	})
}

function removeSquares(){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.display = "none";
	}
}