import React, { useState, useEffect, useRef } from "react";
import "../../styles/ui/Countdown.scss";
import PropTypes from "prop-types";

const Countdown = ({ onComplete, phase, currentPlayerId, userId, closeWindow1, closeWindow2, additionalTime, setAdditionalTime }) => {
  const [count, setCount] = useState(0);
  const [prevAdditionalTime, setPrevAdditionalTime] = useState(0);
  const [max, setMax] = useState(30);
  const [running, setRunning] = useState(false);
  const [prevPhase, setPrevPhase] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Set the countdown to the correct number based on the phase
    if (phase !== prevPhase) {
      if (phase === "REINFORCEMENT") {
        setCount(30);
        setMax(30);
      } else if (phase === "ATTACK") {
        setCount(30);
        setMax(30);
      } else if (phase === "MOVE") {
        setCount(20);
        setMax(20);
      }
      setPrevPhase(phase);
    }

    // Start the countdown if it's the current player's turn, otherwise stop it
    if (currentPlayerId === userId) {
      setRunning(true);
    } else {
      setRunning(false);
    }
  }, [phase, prevPhase, currentPlayerId, userId]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        if (additionalTime > 0) {
          setCount(Math.min(count+additionalTime, max));
          setAdditionalTime(0);
        }
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(intervalRef.current);
            closeWindow1(); // close all windows
            closeWindow2();
            onComplete(); // Call the onComplete function when count reaches 0

            return prevCount;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    // Clean up interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [running, onComplete]);

  return (
    <div className="countdown">
      {running && localStorage.getItem("WinLooseScreenWasShown") === "false" &&(
        <div className="barContainer">
          <div className={`bar ${count < 7 ? "red" : `bar ${count < 12 ? "yellow" : ""}`}`} style={{ width: `${500 * count / max}px` }}>
            <img src={require(`../../styles/views/Pictures/waitIcon.png`)} className={`countdownIcon ${count % 2 === 0 ? "large" : ""}`} />
            <p className="timeLeftText">{count}</p>
          </div>
        </div>
      )}
    </div>
  );
};

Countdown.propTypes = {
  onComplete: PropTypes.func.isRequired,
  phase: PropTypes.string.isRequired,
  currentPlayerId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  closeWindow1: PropTypes.func.isRequired,
  closeWindow2: PropTypes.func.isRequired,
  additionalTime: PropTypes.number.isRequired,
  setAdditionalTime: PropTypes.func.isRrquired
};

export default Countdown;