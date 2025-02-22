import React, { useState, useEffect } from "react";
import TargetObject from "../Target_Object/TargetObject";
import Scoreboard from "../Score_Board/Scoreboard";
import Timer from "../Timer/Timer";
import StartButton from "../Start_Button/StartButton";
import Stick from "../Stick/Stick";
import "./game_board.css";

const GameBoard = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
  };

  const handleSwing = (x, y) => {
    setStickPosition({ x, y });
  };

  return (
    <div className={`game-board ${isPlaying ? "hide-cursor" : ""}`}>
      <Scoreboard score={score} />
      <Timer timeLeft={timeLeft} />
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
  );
};

export default GameBoard;
