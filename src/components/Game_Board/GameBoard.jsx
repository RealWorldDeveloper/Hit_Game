import React, { useState, useEffect } from "react";
import TargetObject from "../Target_Object/TargetObject";
import Scoreboard from "../Score_Board/Scoreboard";
import Timer from "../Timer/Timer";
import StartButton from "../Start_Button/StartButton";
import Stick from "../Stick/Stick";
import "./game_board.css";
import RunningCharacter from "../Character/Character";
const GameBoard = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Change initial time to 60 seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });
  const [gameStarted, setGameStarted] = useState(false); // New state

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsPlaying(false);
            setGameStarted(false); // End the running character
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60); // Reset time to 60 seconds when the game starts
    setIsPlaying(true);
    setGameStarted(false); // Reset gameStarted to false before starting
    setTimeout(() => setGameStarted(true), 5000); // Start the running character after a 5-second delay
  };

  const handleSwing = (x, y) => {
    setStickPosition({ x, y });
  };

  return (
    <>
      <div className={`game-board ${isPlaying ? "hide-cursor" : ""}`}>
        <Scoreboard score={score} />
        <Timer timeLeft={timeLeft} isPlaying={isPlaying} /> {/* Pass isPlaying */}
        {isPlaying && (
          <TargetObject
            setScore={setScore}
            isPlaying={isPlaying}
            stickPosition={stickPosition}
          />
        )}
        <StartButton startGame={startGame} />
        {isPlaying && <Stick onSwing={handleSwing} />}
      </div>
      <div>
        <RunningCharacter setIsPlaying={setIsPlaying} gameStarted={gameStarted} /> {/* Pass gameStarted */}
      </div>
    </>
  );
};

export default GameBoard;
