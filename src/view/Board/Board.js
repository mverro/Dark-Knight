import React, { useState, useEffect } from "react";
import "./GameBoard.css";

const blockTypes = [
  { type: "Rock", pattern: "rock" },
  { type: "Knight", pattern: "knight" },
  { type: "Bishop", pattern: "bishop" },
  { type: "Dragon", pattern: "dragon" },
];

const GameBoard = () => {
  const [cells, setCells] = useState(
    Array.from({ length: 54 }, () => ({ filled: false, pattern: "" }))
  );
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  const handleCellClick = (index) => {
    if (!cells[index].filled) {
      const newCells = [...cells];
      newCells[index] = {
        filled: true,
        pattern: blockTypes[currentBlockIndex].pattern,
      };
      setCells(newCells);

      // Randomly select next block type index
      const randomIndex = Math.floor(Math.random() * blockTypes.length);
      setCurrentBlockIndex(randomIndex);

      // Increase the score
      const newScore =
        blockTypes[randomIndex].type === "Rock" ||
        blockTypes[randomIndex].type === "Bishop"
          ? score + 2
          : score + 1;
      setScore(newScore);

      setTimeLeft(10);
    }
  };

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setGameOver(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  return (
    <>
      <div className="container">
        <div className="row d-flex flex-column align-items-center justify-content-center">
          <div className="col-md-5">
            <div className="game-board">
              {cells.map((cell, index) => (
                <div
                  key={index}
                  className={`cell ${cell.filled ? cell.pattern : ""}`}
                  onClick={() => handleCellClick(index)}
                ></div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="sidebar">
              <div className="container ">
                <div className="next-block d-flex flex-column align-items-center justify-content-center">
                  Next Block:
                  <div
                    className={`next-block-preview ${blockTypes[currentBlockIndex].pattern}`}
                  ></div>
                </div>
              </div>

              <div className="score">Score: {score}</div>
              <div className="time-left">Time left: {timeLeft} seconds</div>
              {gameOver && (
                <div className="game-over">
                  Game Over!{" "}
                  <button onClick={() => window.location.reload()}>
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
