import React, { useState, useEffect } from "react";
import stickImage from "../../assets/stick.png";
import "./stick.css";

const Stick = ({ onSwing }) => {
  const [swing, setSwing] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ top: event.clientY, left: event.clientX });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSwing = (event) => {
    setSwing(true);
    onSwing(event.clientX, event.clientY);
    setTimeout(() => setSwing(false), 300);
  };

  return (
    <img
      src={stickImage}
      alt="Stick"
      className={`stick ${swing ? "swing" : ""}`}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onClick={handleSwing}
    />
  );
};

export default Stick;
