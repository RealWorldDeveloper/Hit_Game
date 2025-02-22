import React from "react";
import "./score_board.css";

const Scoreboard = ({ score }) => {
  return <div className="scoreboard">Score: {score}</div>;
};

export default Scoreboard;
