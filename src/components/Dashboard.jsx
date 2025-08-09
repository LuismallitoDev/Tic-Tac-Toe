import { useState } from "react";
import Turn from "./Turn";
import CellButton from "./CellButton";
import Popup from "./Popup";
import "../styles/dashboard.css";
import Button from "./Button";

function Dashboard() {
  const [isTurn, setIsTurn] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [existWinner, setExistWinner] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const icons = { X: "X", O: "O" };

  function checkWinner(board) {
    const player = isTurn ? "X" : "O";
    for (let combination of winningCombinations) {
      if (combination.every((index) => board[index] === player)) {
        return combination; // return winning cells
      }
    }
    // Check for tie
    if (board.every((cell) => cell === "X" || cell === "O")) {
      return "draw";
    }
    return false;
  }

  const changeText = (index) => {
    if (board[index]) return;
    if (existWinner) return;

    const newBoard = [...board];
    let icon = isTurn ? icons.X : icons.O;
    newBoard[index] = icon;
    setBoard(newBoard);

    const result = checkWinner(newBoard);

    if (Array.isArray(result)) {
      setWinningCells(result);
      setExistWinner(true);
      if (icon === "X") {
        setXWins((prev) => prev + 1);
      } else {
        setOWins((prev) => prev + 1);
      }
    } else if (result === "draw") {
      setExistWinner(null); // null means draw for Popup
    } else {
      setIsTurn(!isTurn);
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsTurn(true);
    setExistWinner(false);
    setWinningCells([]);
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setIsTurn(true);
    setOWins(0);
    setXWins(0);
    setExistWinner(false);
    setWinningCells([]);
  };

  return (
    <>
      <Popup winner={isTurn} status={existWinner} handleClick={handleRestart} />
      <div className="dashboard-container">
        <div className="upper-dashboard">
          <Turn
            activeClass={isTurn ? "active" : ""}
            text={icons.X}
            totalWins={xWins}
          />
          <Turn
            activeClass={isTurn ? "" : "active"}
            text={icons.O}
            totalWins={oWins}
          />
        </div>

        <div className="cell-container">
          {board.map((value, index) => (
            <CellButton
              key={index}
              text={value}
              isWinningCell={winningCells.includes(index)}
              handleClick={() => changeText(index)}
            />
          ))}
        </div>

        <div className="bottom-dashboard">
          <Button text="Restart" handleRestart={handleResetGame} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
