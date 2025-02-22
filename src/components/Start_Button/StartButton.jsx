import React from "react";
import "./start_button.css";

const StartButton = ({ startGame }) => {
  return (
    <button className="start-button" onClick={startGame}>
      Start Game
    </button>
  );
};

export default StartButton;
