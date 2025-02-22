import React from "react";
import "./timer.css";

const Timer = ({ timeLeft }) => {
  return <div className="timer">Time Left: {timeLeft}s</div>;
};

export default Timer;
