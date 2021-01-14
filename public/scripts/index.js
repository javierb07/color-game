function stoppedTyping() {
    if(document.getElementById("playername").value==="") { 
           document.getElementById('play-button').disabled = true; 
       } else { 
           document.getElementById('play-button').disabled = false;
    }
}