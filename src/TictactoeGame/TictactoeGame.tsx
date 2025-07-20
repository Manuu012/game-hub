import React, { useState } from 'react';
import '../styles/Tictactoe.css';


type  Cell={
   id:number;
   value:string;
}

const generateGrid = () => {
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid.push({ id: i, value: '' });
  }
  return grid;
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TictactoeGame() {
  const [grid, setGrid] = useState(generateGrid());
  const [currentUser, setCurrentUser] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);

  const checkWinner = (updatedGrid: Cell[]): { winner: string; cells: number[] } | null => {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      updatedGrid[a].value &&
      updatedGrid[a].value === updatedGrid[b].value &&
      updatedGrid[b].value === updatedGrid[c].value
    ) {
      return { winner: updatedGrid[a].value, cells: combo };
    }
  }
  return null;
};


  const handleClick = (cell:Cell) => {
    if (cell.value || winner) return;

    const newGrid = grid.map((item) =>
      item.id === cell.id ? { ...item, value: currentUser } : item
    );

    setGrid(newGrid);

    const result = checkWinner(newGrid);
    if (result) {
      setWinner(result.winner);
      setWinningCells(result.cells);
    } else if (newGrid.every((cell) => cell.value)) {
      setWinner('Draw');
    } else {
      setCurrentUser((prev) => (prev === 'X' ? 'O' : 'X'));
    }
  };

  const handleReset = () => {
    setGrid(generateGrid());
    setCurrentUser('X');
    setWinner(null);
    setWinningCells([]);
  };

  return (
    <div className="ttt-container">
      <h1>Tic Tac Toe</h1>
      <p> User {winner ? (winner === 'Draw' ? 'Game is a Draw!' : `${winner} Wins!`) : `Current Turn: ${currentUser}`}</p>

      <div className="ttt-grid">
        {grid.map((cell) => (
          <button
            key={cell.id}
            className={`ttt-cell ${cell.value ? 'pop' : ''} ${
              winningCells.includes(cell.id) ? 'winner-cell' : ''
            }`}
            onClick={() => handleClick(cell)}
            disabled={!!cell.value || !!winner}
          >
            {cell.value}
          </button>
        ))}
      </div>

      {winner && (
        <button className="reset-btn" onClick={handleReset}>
          Restart Game
        </button>
      )}

    </div>
  );
}
