// DOM Elements
const gameStart = document.getElementById("game-start");
const playerForm = document.getElementById("player-form");
const gamePlay = document.getElementById("game-play");
const gameResult = document.getElementById("game-result");
const gameTitle = document.getElementById("game-title");
const resultTitle = document.getElementById("result-title");

let isComputerOpponent = true;
let player1 = "Player 1";
let player2 = "Computer";
let currentPlayer = player1;
let player1Choice = '';
let player2Choice = '';

// Game Start Handlers
document.getElementById("playComputer").addEventListener("click", () => {
    isComputerOpponent = true;
    player1 = "Player 1";
    player2 = "Computer";
    startGame();
});

document.getElementById("playPerson").addEventListener("click", () => {
    isComputerOpponent = false;
    gameStart.classList.add("hidden");
    playerForm.classList.remove("hidden");
});

document.getElementById("startGame").addEventListener("click", () => {
    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";
    startGame();
});

function startGame() {
    playerForm.classList.add("hidden");
    gameStart.classList.add("hidden");
    gamePlay.classList.remove("hidden");
    gameTitle.textContent = `${player1}'s Turn!`;
    currentPlayer = player1;
}

// Game Play Logic
document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", (e) => {
        const choice = e.target.dataset.choice;
        
        if (currentPlayer === player1) {
            player1Choice = choice;
            currentPlayer = player2;
            gameTitle.textContent = `${player2}'s Turn!`;

            if (isComputerOpponent) {
                setTimeout(() => {
                    player2Choice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
                    displayResult();
                }, 1000);
            }
        } else {
            player2Choice = choice;
            displayResult();
        }
    });
});

// Result Display
function displayResult() {
    gamePlay.classList.add("hidden");
    gameResult.classList.remove("hidden");

    const winner = getWinner();
    resultTitle.textContent = winner === "draw" ? "It's a Draw!" : `${winner} Wins!`;
}

// Determine the Winner
function getWinner() {
    if (player1Choice === player2Choice) return "draw";

    if (
        (player1Choice === "rock" && player2Choice === "scissors") ||
        (player1Choice === "paper" && player2Choice === "rock") ||
        (player1Choice === "scissors" && player2Choice === "paper")
    ) {
        return player1;
    } else {
        return player2;
    }
}

// Play Again
document.getElementById("playAgain").addEventListener("click", () => {
    gameResult.classList.add("hidden");
    gameStart.classList.remove("hidden");
});
