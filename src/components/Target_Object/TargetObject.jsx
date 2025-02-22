import React, { useState, useEffect } from "react";
import hitSound from "../../assets/hit-sound.mp3";
import targetImage from "../../assets/target.png";
import "./target_object.css";

const TargetObject = ({ setScore, isPlaying, stickPosition }) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      setVisible(false);
      return;
    }

    const showObject = () => {
      setPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      });
      setVisible(true);

      setTimeout(() => setVisible(false), 1000);
    };

    const interval = setInterval(showObject, Math.random() * 3000 + 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (visible) {
      const targetElement = document.querySelector(".target-object");
      const targetRect = targetElement.getBoundingClientRect();
      if (
        stickPosition.x >= targetRect.left &&
        stickPosition.x <= targetRect.right &&
        stickPosition.y >= targetRect.top &&
        stickPosition.y <= targetRect.bottom
      ) {
        handleHit();
      }
    }
  }, [stickPosition]);

  const handleHit = () => {
    new Audio(hitSound).play();
    setScore((prev) => prev + 1);
    setVisible(false);
  };

  return (
    visible && (
      <img
        src={targetImage}
        alt="Target"
        className="target-object"
        style={position}
        onClick={handleHit}
      />
    )
  );
};

export default TargetObject;
