const container = document.querySelector('.container');
const cells = document.querySelectorAll('.cell');
let mainContainer = container.parentNode;
let currentPlayer = 'X';

document.addEventListener('DOMContentLoaded', () => {
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.textContent === '') {
                cell.textContent = currentPlayer;
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }

            // First Occurrence: currentPlayer === 'X'
            // This part checks if the current value of currentPlayer is 'X'.
            // Second Occurrence: currentPlayer = ...
            // This part assigns a new value to currentPlayer based on the result of the condition.
        })
    })
})

let winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWinner(cells) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        
        if (cells[a].textContent && 
            cells[a].textContent === cells[b].textContent && 
            cells[a].textContent === cells[c].textContent) {
                
            // We have a winner
            let winner = cells[a].textContent;
            console.log(`${winner} wins!`);
            return winner;
        }
    }
    return null; // No winner found
}

function displayWinner(winner){
    let winningPlayer = document.createElement('h1');
    if(winner === 'X'){
        winningPlayer.innerHTML = '<strong id="infoText">Player X is the winner</strong>';
    }else if(winner === 'O'){
        winningPlayer.innerHTML = '<strong id="infoText">Player O is the winner</strong>';
    }
    mainContainer.insertBefore(winningPlayer,container);
}


cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

function handleCellClick(event) {
    const cell = event.target;
    cell.textContent = currentPlayer;
    movesCount++;
    
    let winner = checkWinner(cells);
    
    if (winner) {
        displayWinner(winner);
    } else if (movesCount === 9) {
        displayWinner(null);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

let movesCount = 0;
let winner = checkWinner(cells);
displayWinner(winner);