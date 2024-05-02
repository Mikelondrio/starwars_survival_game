function rollD20() {
    
    const result = Math.floor(Math.random() * 20) + 1;
    console.log(result);
    return result;
}


function displayMessage(){

    let survivalRate = parseInt(localStorage.getItem('survivalRate'));
    if (isNaN(survivalRate)) {
        survivalRate = 0; // Establecer un valor predeterminado si no hay valor en localStorage
    }
    const rollResult = rollD20();
    survivalRate += rollResult;

    function getMessage(survivalRate, rollResult) {
        if (rollResult === 1) {
            return {
                message: "You are dead, you died alone. You were deceived and killed. Your name will be erased from history, nobody cared ever... and never will.",
                imageUrl: "./survival/muerte.png"
            };
        } else if (rollResult === 20) {
            return {
                message: "You have become a legend with the Force, in every star of the galaxy you are spoken of, you will be remembered to infinity... and beyond.",
                imageUrl: "./survival/leyenda.png"
            };
        } else if (survivalRate <= 5) {
            return {
                message: "Bad luck, you were captured by a Hutt. Now you are a slave, a fate almost worse than death. Perhaps if you are lucky, someone will save you, but don't count on it, this galaxy is ruthless.",
                imageUrl: "./survival/jabba.png"
            };
        } else if (survivalRate <= 10) {
            return {
                message: "Your bets went wrong; you owe a lot of credits to some tough people. You're in deep trouble, but you can still get out of this. May the Force be with you.",
                imageUrl: "./survival/bets.png"
            };
        } else if (survivalRate <= 14) {
            return {
                message: "You ended up starting a family and buying a small farm. With the sweat of your brow, you managed to create a home and have enough resources to sustain yourself. Your life is simple but happy.",
                imageUrl: "./survival/farm.jpg"
            };
        } else if (survivalRate <= 18) {
            return {
                message: "You became part of the Republic Council. Your connection with the Force guaranteed you the position; it's both a privilege and a responsibility. The future of the galaxy is in your hands, for better... or for worse.",
                imageUrl: "./survival/council.png"
            };
        } else {
            return {
                message: "You have become a legend with the Force, in every star of the galaxy you are spoken of, you will be remembered to infinity... and beyond.",
                imageUrl: "./survival/leyenda.png"
            };
        }
    }

    const { message, imageUrl } = getMessage(survivalRate, rollResult);

    // Mostrar el mensaje y la imagen en la página result.html
    const messageElement = document.getElementById("resultMessage");
    messageElement.textContent = message;

    const imageElement = document.getElementById("resultImage");
    imageElement.src = imageUrl;
   
    
}

//MOSTRAR EL MENSAJE
window.onload = displayMessage;

//FUNCION PARA REINICIAR EL JUEGO//
function restartGame() {
    localStorage.removeItem('survivalRate');
    window.location.href = "index.html";
}

