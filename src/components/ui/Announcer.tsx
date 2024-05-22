import React, { useState, useEffect, useRef } from "react";
import "../../styles/ui/Announcer.scss";
import PropTypes from "prop-types";

const Announcer = ({ phase, currentPlayerId, userId, game }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prevPhase, setPrevPhase] = useState(null);
  const [prevPlayerId, setPrevPlayerId] = useState(null);
  const [currentColor, setCurrentColor] = useState(0);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
      // set current color
      let x = 0;
        if (game?.turnCycle?.currentPlayer?.playerId) {
          for (const player of game.players) {
            if (player.playerId === game.turnCycle.currentPlayer.playerId) {
              setCurrentColor(x);
            }
            x++;
          }
        }
      // if it's this player's turn
      if (prevPhase !== phase || prevPlayerId !== currentPlayerId) {
        setPrevPhase(phase);
        setCount(1)
        // Update the message based on the phase
        let newMessage = "";
        if (currentPlayerId === userId) {
          switch (phase) {
            case "REINFORCEMENT":
                newMessage = "Your Turn! Reinforce!";
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
        } else if (game?.turnCycle?.currentPlayer?.username) {
          switch (phase) {
            case "REINFORCEMENT":
                newMessage = `${game.turnCycle.currentPlayer.username} reinforces troops!`;
                break;
            case "ATTACK":
                newMessage = `${game.turnCycle.currentPlayer.username} is attacking now!`;
                break;
            case "MOVE":
                newMessage = `${game.turnCycle.currentPlayer.username} may move troops!`;
                break;
            default:
                newMessage = `${game.turnCycle.currentPlayer.username} is on the move!`;
            }
        }
        

      setMessage(newMessage);
      setIsVisible(true);
      }
  }, [phase, currentPlayerId, userId, prevPhase]);


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
        <div className={`announcerContainer ${isVisible ? "visible" : "hidden"}
          ${game === null ? "c1" : `
          ${currentColor === 0 ? "c1" : `
          ${currentColor === 1 ? "c2" : `
          ${currentColor === 2 ? "c3" : `
          ${currentColor === 3 ? "c4" : `
          ${currentColor === 4 ? "c5" : `
          ${currentColor === 5 ? "c6" : "c1"}`}`}`}`}`}`}`}>
            <div className={`announcer ${isVisible ? "visible" : "hidden"}`}>
            {message}
            </div>
        </div>
    </div>
  );
}; 

Announcer.propTypes = {
  phase: PropTypes.string.isRequired,
  currentPlayerId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  game: PropTypes.object.isRequired
};

export default Announcer;
