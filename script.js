const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWin(player) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    return winCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player;
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== "");
}

function handleClick(event) {
    const cellIndex = event.target.dataset.index;
    if (gameBoard[cellIndex] === "" && !checkWin(currentPlayer)) {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer);
        if (checkWin(currentPlayer)) {
            status.textContent = `Player ${currentPlayer} wins!`;
        } else if (checkDraw()) {
            status.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    status.textContent = "Player X's turn";
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}

board.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);

for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
}

resetGame();
