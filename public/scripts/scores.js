var messageDisplay = document.querySelector("#message");
var modeButtons = document.querySelectorAll(".mode");
let easyRows = document.querySelectorAll(".easy");
let hardRows = document.querySelectorAll(".hard");
let hardestRows = document.querySelectorAll(".hardest");

easyRows.forEach(element => element.style.display ="none");
hardRows.forEach(element => element.style.display ="table-row");
hardestRows.forEach(element => element.style.display ="none");

setupModeButtons();

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			switch (this.textContent) {
				case "Easy":
					easyRows.forEach(element => element.style.display ="table-row");
					hardRows.forEach(element => element.style.display ="none");
					hardestRows.forEach(element => element.style.display ="none");
                    break;
				case "Hard":
					easyRows.forEach(element => element.style.display ="none");
					hardRows.forEach(element => element.style.display ="table-row");
					hardestRows.forEach(element => element.style.display ="none");
					break;
				case "Hardest":
					easyRows.forEach(element => element.style.display ="none");
					hardRows.forEach(element => element.style.display ="none");
					hardestRows.forEach(element => element.style.display ="table-row");
					break;
			}
		});
	}
}