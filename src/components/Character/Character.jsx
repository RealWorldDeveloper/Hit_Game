import React, { useState, useEffect } from "react";
import "./Character.css";
import StartButton from "../Start_Button/StartButton";

const RunningCharacter = ({ setIsPlaying, gameStarted }) => {
  const [frame, setFrame] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (gameEnded || !gameStarted) return;

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 6); // Cycle through 6 frames
    }, 100);

    return () => clearInterval(interval);
  }, [gameEnded, gameStarted]);

  useEffect(() => {
    const checkCollision = () => {
      const movingObject = document.querySelector(".moving-object");
      const helicopter = document.querySelector(".helicopter");

      if (movingObject && helicopter) {
        const movingRect = movingObject.getBoundingClientRect();
        const helicopterRect = helicopter.getBoundingClientRect();

        if (
          movingRect.right >= helicopterRect.left &&
          movingRect.left <= helicopterRect.right &&
          movingRect.bottom >= helicopterRect.top &&
          movingRect.top <= helicopterRect.bottom
        ) {
          setIsPlaying(false);
          setIsFading(true);
          setTimeout(() => {
            setIsVisible(false);
            setGameEnded(true);
          }, 500); // Fade-out duration
        }
      }
    };

    const collisionInterval = setInterval(checkCollision, 100);

    return () => clearInterval(collisionInterval);
  }, [setIsPlaying]);

  useEffect(() => {
    if (!gameStarted) return;

    setIsVisible(true); // Reset visibility
    setIsFading(false); // Reset fading
    setGameEnded(false); // Reset game ended state

    const timeout = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        setGameEnded(true);
      }, 500); // Fade-out duration
    }, 60000); // 1 minute

    return () => clearTimeout(timeout);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const delayTimeout = setTimeout(() => {
      setIsVisible(true); // Reset visibility
      setIsFading(false); // Reset fading
      setGameEnded(false); // Reset game ended state
    }, 5000); // 5 seconds delay

    return () => clearTimeout(delayTimeout);
  }, [gameStarted]);

  return (
    <div className="animation-container">
      {isVisible && !gameEnded && gameStarted && (
        <>
          <div className={`moving-object ${isFading ? 'fade-out' : ''}`} />
          <img src='https://media2.giphy.com/media/qPnlSzSYg5QkWwbTOv/giphy.gif?cid=6c09b952ly19d9pj8sq4732kjypq697trwfh7qb4r5q3uhup&ep=v1_stickers_search&rid=giphy.gif&ct=shttps://i.pinimg.com/originals/be/61/4d/be614d780f0cd3b930fd13f3efb8689e.gif' alt="Helicopter" className={`helicopter ${isFading ? 'fade-out' : ''}`} />
        </>
      )}
    </div>
  );
};

export default RunningCharacter;


