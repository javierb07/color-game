let selectSound = document.getElementById("selectSound");
let playButton = document.getElementById("play-button");

playButton.addEventListener("click", function(){
	selectSound.play();
});

function stoppedTyping() {
    if(document.getElementById("playername").value==="") { 
           document.getElementById('play-button').disabled = true; 
       } else { 
           document.getElementById('play-button').disabled = false;
    }
}