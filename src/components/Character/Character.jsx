import React, { useState, useEffect } from "react";
import "./Character.css";


const RunningCharacter = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 6); // Cycle through 6 frames
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animation-container">
      <div className="moving-object" />
      <img src='https://media2.giphy.com/media/qPnlSzSYg5QkWwbTOv/giphy.gif?cid=6c09b952ly19d9pj8sq4732kjypq697trwfh7qb4r5q3uhup&ep=v1_stickers_search&rid=giphy.gif&ct=shttps://i.pinimg.com/originals/be/61/4d/be614d780f0cd3b930fd13f3efb8689e.gif' alt="Helicopter" className="helicopter" />
    </div>
  );
};

export default RunningCharacter;


