const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== null || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        isGameActive = false;
        document.getElementById("text").innerText = `${currentPlayer} wins!`;
        return;
    }

    if (!gameState.includes(null)) {
        isGameActive = false;
        document.getElementById("text").innerText = `Draw!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== null && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    document.getElementById("text").innerText = ""; // Clear the game status text
    gameState.fill(null); // Reset the gameState array to null values
    cells.forEach(cell => cell.textContent = ''); // Clear the text content of all cells
    currentPlayer = 'X'; // Reset currentPlayer to 'X' (assuming 'X' starts the game)
    isGameActive = true; // Set the game state flag to active
}
