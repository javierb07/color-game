var messageDisplay = document.querySelector("#message");
var modeButtons = document.querySelectorAll(".mode");
let easyRows = document.querySelectorAll(".easy");
let normalRows = document.querySelectorAll(".normal");
let hardRows = document.querySelectorAll(".hard");
let selectSound = document.getElementById("selectSound");
let againButton = document.getElementById("again");

easyRows.forEach(element => element.style.display ="none");
normalRows.forEach(element => element.style.display ="table-row");
hardRows.forEach(element => element.style.display ="none");

setupModeButtons();
againButton.addEventListener("click", function(){
	selectSound.play();
});

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
					easyRows.forEach(element => element.style.display ="table-row");
					normalRows.forEach(element => element.style.display ="none");
					hardRows.forEach(element => element.style.display ="none");
                    break;
				case "Normal":
					easyRows.forEach(element => element.style.display ="none");
					normalRows.forEach(element => element.style.display ="table-row");
					hardRows.forEach(element => element.style.display ="none");
					break;
				case "Hard":
					easyRows.forEach(element => element.style.display ="none");
					normalRows.forEach(element => element.style.display ="none");
					hardRows.forEach(element => element.style.display ="table-row");
					break;
			}
		});
	}
}