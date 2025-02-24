import React, { useEffect, useState } from "react";
import "./timer.css";

const Timer = ({ timeLeft, isPlaying }) => {
  const [progressBarColor, setProgressBarColor] = useState("gray");

  useEffect(() => {
    if (isPlaying) {
      if (timeLeft > 40) {
        setProgressBarColor("green");
      } else if (timeLeft > 20) {
        setProgressBarColor("orange");
      } else {
        setProgressBarColor("red");
      }
    } else {
      setProgressBarColor("gray");
    }
  }, [timeLeft, isPlaying]);

  const progress = (timeLeft / 60) * 100; // Calculate progress percentage

  return (
    <div className="timer-container">
      <div
        className="timer-bar"
        style={{ width: `${progress}%`, backgroundColor: progressBarColor }}
      ></div>
    </div>
  );
};

export default Timer;
