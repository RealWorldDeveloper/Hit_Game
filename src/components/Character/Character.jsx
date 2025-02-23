import React, { useState, useEffect } from "react";
import "./Character.css";

const RunningCharacter = ({ setIsPlaying }) => {
  const [frame, setFrame] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 6); // Cycle through 6 frames
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
          setTimeout(() => setIsVisible(false), 500); // Fade-out duration
        }
      }
    };

    const collisionInterval = setInterval(checkCollision, 100);

    return () => clearInterval(collisionInterval);
  }, [setIsPlaying]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 500); // Fade-out duration
    }, 60000); // 1 minute

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="animation-container">
      {isVisible && (
        <>
          <div className={`moving-object ${isFading ? 'fade-out' : ''}`} />
          <img src='https://media2.giphy.com/media/qPnlSzSYg5QkWwbTOv/giphy.gif?cid=6c09b952ly19d9pj8sq4732kjypq697trwfh7qb4r5q3uhup&ep=v1_stickers_search&rid=giphy.gif&ct=shttps://i.pinimg.com/originals/be/61/4d/be614d780f0cd3b930fd13f3efb8689e.gif' alt="Helicopter" className={`helicopter ${isFading ? 'fade-out' : ''}`} />
        </>
      )}
    </div>
  );
};

export default RunningCharacter;


