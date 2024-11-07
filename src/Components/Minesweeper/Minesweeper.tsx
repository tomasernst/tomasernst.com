import { useState, useEffect } from 'react';
import { CellState, Cell } from './types';
import CellComponent from './Cell';

import Confetti from 'react-confetti-boom';

import './Minesweeper.css';

const rows = 10;
const cols = 10;
const minesCount = 15;

const Minesweeper: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flaggedCells, setFlaggedCells] = useState(0);

  useEffect(() => {
    initBoard();
  }, []);

  const initBoard = () => {
    const newBoard: Cell[][] = [];

    // Initialize board with empty cells
    for (let i = 0; i < rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          state: CellState.Hidden,
          hasMine: false,
          adjacentMines: 0,
        });
      }
      newBoard.push(row);
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * cols);
      if (!newBoard[x][y].hasMine) {
        newBoard[x][y].hasMine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines for each cell
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (!newBoard[x][y].hasMine) {
          let count = 0;
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const nx = x + dx;
              const ny = y + dy;
              if (
                nx >= 0 &&
                nx < rows &&
                ny >= 0 &&
                ny < cols &&
                newBoard[nx][ny].hasMine
              ) {
                count++;
              }
            }
          }
          newBoard[x][y].adjacentMines = count;
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
    setFlaggedCells(0);
  };

  const revealCell = (x: number, y: number) => {
    if (gameOver || gameWon || board[x][y].state !== CellState.Hidden) return;

    const newBoard = board.map((row) => row.slice());

    // If the cell is flagged, don't allow it to be revealed
    if (newBoard[x][y].state === CellState.Flagged) return;

    newBoard[x][y].state = CellState.Revealed;

    if (newBoard[x][y].hasMine) {
      setGameOver(true);
      // Reveal all mines
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (newBoard[i][j].hasMine) {
            newBoard[i][j].state = CellState.Revealed;
          }
        }
      }
      setBoard(newBoard);
    } else {
      if (newBoard[x][y].adjacentMines === 0) {
        revealAdjacentCells(newBoard, x, y);
      } else {
        setBoard(newBoard);
      }
      checkWinCondition(newBoard);
    }
  };

  const revealAdjacentCells = (board: Cell[][], x: number, y: number) => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < rows &&
          ny >= 0 &&
          ny < cols &&
          board[nx][ny].state === CellState.Hidden &&
          !board[nx][ny].hasMine
        ) {
          board[nx][ny].state = CellState.Revealed;
          if (board[nx][ny].adjacentMines === 0) {
            revealAdjacentCells(board, nx, ny);
          }
        }
      }
    }
    setBoard([...board]);
  };

  const checkWinCondition = (board: Cell[][]) => {
    const totalCells = rows * cols;
    const nonMineCells = totalCells - minesCount;
    let revealedCells = 0;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (
          board[x][y].state === CellState.Revealed &&
          !board[x][y].hasMine
        ) {
          revealedCells++;
        }
      }
    }

    if (revealedCells === nonMineCells) {
      setGameWon(true);
      // Set flaggedCells to 0 if the user wins
      setFlaggedCells(0);

      // Optionally, flag all remaining mines
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
          if (board[x][y].state === CellState.Hidden && board[x][y].hasMine) {
            board[x][y].state = CellState.Flagged;
          }
        }
      }
      setBoard([...board]);
    }
  };

  const flagCell = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => {
    e.preventDefault();
    if (
      gameOver ||
      gameWon ||
      board[x][y].state === CellState.Revealed ||
      (flaggedCells >= minesCount && board[x][y].state !== CellState.Flagged)
    ) {
      return;
    }

    const newBoard = board.map((row) => row.slice());
    if (newBoard[x][y].state === CellState.Flagged) {
      newBoard[x][y].state = CellState.Hidden;
      setFlaggedCells((prev) => prev - 1);
    } else {
      newBoard[x][y].state = CellState.Flagged;
      setFlaggedCells((prev) => prev + 1);
    }

    setBoard(newBoard);
  };

  return (
    <div className="minesweeper-wrapper">
      <div className="minesweeper-info">
        <p>Mines Remaining: {gameWon ? 0 : minesCount - flaggedCells}</p>
        {gameWon && (
          <>
            <p className="minesweeper-status">🎉 Congratulations! You won!</p>
            <Confetti mode='fall' particleCount={300} colors={['#81c14b', '#2e933b', '#297045']}/>
          </>
        )}
        {gameOver && <p className="minesweeper-status">💥 Game Over!</p>}
      </div>
      <div className="minesweeper-container">
        {board.map((row, x) => (
          <div key={x} className="minesweeper-row">
            {row.map((cell, y) => (
              <CellComponent
                key={y}
                cell={cell}
                onClick={() => revealCell(x, y)}
                onRightClick={(e) => flagCell(e, x, y)}
              />
            ))}
          </div>
        ))}
      </div>
      {(gameOver || gameWon) && (
        <button className="minesweeper-restart-button" onClick={initBoard}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default Minesweeper;
