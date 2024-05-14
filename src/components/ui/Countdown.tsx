import React, { useState, useEffect, useRef } from "react";
import "../../styles/ui/Countdown.scss";
import PropTypes from "prop-types";

const Countdown = ({ onComplete, phase, currentPlayerId, userId }) => {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [prevPhase, setPrevPhase] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Set the countdown to the correct number based on the phase
    if (phase !== prevPhase) {
      if (phase === "REINFORCEMENT") {
        setCount(30);
      } else if (phase === "ATTACK") {
        setCount(30);
      } else if (phase === "MOVE") {
        setCount(20);
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
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(intervalRef.current);
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
      {running && (
      <div className="barContainer">
        <div className="bar" style={{ width: `${400 * count / 60}px` }}>
          <p className="timeLeftText">Time left: {count}</p>
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
  userId: PropTypes.number.isRequired
};

export default Countdown;