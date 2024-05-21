import React, { useState, useEffect, useRef } from "react";
import "../../styles/ui/Announcer.scss";
import PropTypes from "prop-types";

const Announcer = ({ phase, currentPlayerId, userId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prevPhase, setPrevPhase] = useState(null);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {

      // Start the countdown if it's the current player's turn, otherwise stop it
      if (currentPlayerId !== userId) {
        //setIsVisible(false);
      }
      if (prevPhase !== phase && currentPlayerId === userId) {
        setPrevPhase(phase);
        setCount(1)
        // Update the message based on the phase
        let newMessage = "";
        switch (phase) {
        case "REINFORCEMENT":
            newMessage = "Reinforce your troops!";
            break;
        case "ATTACK":
            newMessage = "Time to attack!";
            break;
        case "MOVE":
            newMessage = "Move your troops!";
            break;
        default:
            newMessage = "Phase changed!";
        }

      setMessage(newMessage);
      setIsVisible(true);
    }
  }, [phase, currentPlayerId, userId, prevPhase]);

  useEffect(() => {

    // Start the countdown if it's the current player's turn, otherwise stop it
    if (currentPlayerId !== userId) {
      setIsVisible(true);
      setCount(2)
      // Update the message based on the phase
      let newMessage = "Your turn is over!";
      

    setMessage(newMessage);
    setIsVisible(true);
  }
}, [currentPlayerId]);

  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsVisible(false);

            return prevCount;
          }
        });
      }, 700);
    } else {
      clearInterval(intervalRef.current);
    }

    // Clean up interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [isVisible]);

  return (
    <div>
      {localStorage.getItem("GameHasWinner") === "false" &&(
        <div className={`announcerContainer ${isVisible ? "visible" : "hidden"} ${currentPlayerId !== userId ? "turnOverColor" : ""}`}>
          <div className={`announcer ${isVisible ? "visible" : "hidden"}`}>
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

Announcer.propTypes = {
  phase: PropTypes.string.isRequired,
  currentPlayerId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired
};

export default Announcer;
