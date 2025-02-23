import React, { useState, useEffect } from "react";
import hitSound from "../../assets/hit-sound.mp3";
import fakeHitSound from "../../assets/fake-hit-sound.mp3"; // Add your fake hit sound here
import targetImage from "../../assets/target.png";
import fakeTargetImage from "../../assets/fake-target.png"; // Add your fake target image here
import fakeTargetImage2 from "../../assets/fake-target-2.png"; // Add your second fake target image here
import fakeTargetImage3 from "../../assets/fake-target-3.png"; // Add your third fake target image here
import hitAnimation from "../../assets/smash.png"; // Add your animation image here
import "./target_object.css";

const TargetObject = ({ setScore, isPlaying, stickPosition, setTime }) => {
  const [objects, setObjects] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false); // State for animation
  const [animationPosition, setAnimationPosition] = useState({ top: "50%", left: "50%" });
  const [showingFakeObjects, setShowingFakeObjects] = useState(false); // State to track fake objects
  const [shake, setShake] = useState(false); // State to track shake effect

  useEffect(() => {
    if (!isPlaying) {
      setObjects([]);
      return;
    }

    const showObject = () => {
      const newObjects = [];
      const showBoth = Math.random() > 0.5; // 50% chance to show both fake and real objects

      if (showBoth) {
        newObjects.push({
          id: 0,
          type: "fake",
          position: {
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          },
          speed: Math.random() * 2 + 1, // Random speed between 1 and 3 seconds
          direction: Math.random() > 0.5 ? 'horizontal' : 'vertical', // Random direction
          visible: true,
        });

        newObjects.push({
          id: 1,
          type: "real",
          position: {
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          },
          speed: Math.random() * 2 + 1, // Random speed between 1 and 3 seconds
          direction: Math.random() > 0.5 ? 'horizontal' : 'vertical', // Random direction
          visible: true,
        });
      } else {
        if (Math.random() > 0.5) { // 50% chance to show a fake object
          setShowingFakeObjects(true);
          newObjects.push({
            id: 0,
            type: "fake",
            position: {
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            },
            speed: Math.random() * 2 + 1, // Random speed between 1 and 3 seconds
            direction: Math.random() > 0.5 ? 'horizontal' : 'vertical', // Random direction
            visible: true,
          });
        } else {
          setShowingFakeObjects(false);
          newObjects.push({
            id: 0,
            type: "real",
            position: {
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            },
            speed: Math.random() * 2 + 1, // Random speed between 1 and 3 seconds
            direction: Math.random() > 0.5 ? 'horizontal' : 'vertical', // Random direction
            visible: true,
          });
        }
      }

      setObjects(newObjects);

      setTimeout(() => {
        setObjects((prevObjects) =>
          prevObjects.map((obj) => ({ ...obj, visible: false }))
        );
        setRandomInterval(); // Set a new random interval after the objects disappear
      }, 1000); // Disappear more quickly (1 second)
    };

    const showFrequentFakeObject = () => {
      const newObjects = [];
      newObjects.push({
        id: 2,
        type: "fake2",
        position: {
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
        },
        speed: Math.random() * 1 + 0.5, // Random speed between 0.5 and 1.5 seconds
        direction: Math.random() > 0.5 ? 'horizontal' : 'vertical', // Random direction
        visible: true,
      });

      setObjects((prevObjects) => [...prevObjects, ...newObjects]);

      setTimeout(() => {
        setObjects((prevObjects) =>
          prevObjects.map((obj) => (obj.id === 2 ? { ...obj, visible: false } : obj))
        );
        setFrequentFakeInterval(); // Set a new random interval after the objects disappear
      }, 1000); // Disappear more slowly (1 second)
    };

    const showRareFakeObject = () => {
      const newObjects = [];
      newObjects.push({
        id: 3,
        type: "fake3",
        position: {
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
        },
        speed: Math.random() * 3 + 2, // Random speed between 2 and 5 seconds
        direction: Math.random() > 0.5 ? 'horizontal' : 'vertical', // Random direction
        visible: true,
      });

      setObjects((prevObjects) => [...prevObjects, ...newObjects]);

      setTimeout(() => {
        setObjects((prevObjects) =>
          prevObjects.map((obj) => (obj.id === 3 ? { ...obj, visible: false } : obj))
        );
        setRareFakeInterval(); // Set a new random interval after the objects disappear
      }, 3000); // Disappear more slowly (3 seconds)
    };

    const setRandomInterval = () => {
      const randomTime = Math.random() * 1000 + 500; // Random time between 0.5 to 1.5 seconds
      const interval = setTimeout(showObject, randomTime);
      return () => clearTimeout(interval);
    };

    const setFrequentFakeInterval = () => {
      const randomTime = Math.random() * 2000 + 1000; // Random time between 1 to 3 seconds
      const interval = setTimeout(showFrequentFakeObject, randomTime);
      return () => clearTimeout(interval);
    };

    const setRareFakeInterval = () => {
      const randomTime = Math.random() * 5000 + 5000; // Random time between 5 to 10 seconds
      const interval = setTimeout(showRareFakeObject, randomTime);
      return () => clearTimeout(interval);
    };

    const clearRandomInterval = setRandomInterval();
    const clearFrequentFakeInterval = setFrequentFakeInterval();
    const clearRareFakeInterval = setRareFakeInterval();
    return () => {
      clearRandomInterval();
      clearFrequentFakeInterval();
      clearRareFakeInterval();
    };
  }, [isPlaying]);

  useEffect(() => {
    objects.forEach((obj) => {
      if (obj.visible) {
        const targetElement = document.querySelector(`.target-object-${obj.id}`);
        const targetRect = targetElement.getBoundingClientRect();
        if (
          stickPosition.x >= targetRect.left &&
          stickPosition.x <= targetRect.right &&
          stickPosition.y >= targetRect.top &&
          stickPosition.y <= targetRect.bottom
        ) {
          handleHit(obj);
        }
      }
    });
  }, [stickPosition, objects]);

  useEffect(() => {
    const shakeScreen = () => {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Shake duration
    };

    const shakeInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to shake the screen
        shakeScreen();
      }
    }, Math.random() * 5000 + 5000); // Random interval between 5 to 10 seconds

    return () => clearInterval(shakeInterval);
  }, []);

  const handleHit = (obj) => {
    if (obj.type === "real") {
      new Audio(hitSound).play();
      setAnimationPosition(obj.position);
      setShowAnimation(true); // Show animation
      setTimeout(() => setShowAnimation(false), 1000); // Hide animation after 1 second
      setScore((prev) => prev + 1);
    } else if (obj.type === "fake") {
      new Audio(fakeHitSound).play();
      setScore((prev) => prev - 1);
    } else if (obj.type === "fake2") {
      new Audio(fakeHitSound).play();
      setScore((prev) => prev - 5);
    } else if (obj.type === "fake3") {
      new Audio(fakeHitSound).play();
      setTime((prev) => prev + 10); // Increase time by 10 seconds
    }
    setObjects((prevObjects) =>
      prevObjects.map((o) => (o.id === obj.id ? { ...o, visible: false } : o))
    );
    console.log("Hit object:", obj);
  };

  return (
    <div className={`${isPlaying ? "game-area" : ""} ${shake ? "shake" : ""}`}>
      {objects.map(
        (obj) =>
          obj.visible && (
            <img
              key={obj.id}
              src={obj.type === "real" ? targetImage : obj.type === "fake" ? fakeTargetImage : obj.type === "fake2" ? fakeTargetImage2 : fakeTargetImage3}
              alt={obj.type === "real" ? "Target" : obj.type === "fake" ? "Fake Target" : obj.type === "fake2" ? "Fake Target 2" : "Fake Target 3"}
              className={`target-object target-object-${obj.id}`}
              style={{
                ...obj.position,
                animationName: obj.direction === 'horizontal' ? 'move-horizontal' : 'move-vertical',
                animationDuration: `${obj.speed}s`,
              }}
              onClick={() => handleHit(obj)}
            />
          )
      )}
      {showAnimation && (
        <img
          src={hitAnimation}
          alt="Hit Animation"
          className="hit-animation"
          style={animationPosition}
        />
      )}
    </div>
  );
};

export default TargetObject;
