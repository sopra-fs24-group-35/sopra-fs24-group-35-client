import React, { useState, useEffect, useRef } from "react";
import "../../styles/ui/Announcer.scss";
import PropTypes from "prop-types";

const Announcer = ({ phase, currentPlayerId, userId, game }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prevPhase, setPrevPhase] = useState(null);
  const [prevPlayerId, setPrevPlayerId] = useState(null);
  const [initialId, setInitialId] = useState(0);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
      // set initial ID
      if (initialId === null && game?.turnCycle?.currentPlayer?.playerId !== null) {
        setInitialId(game.turnCycle.currentPlayer.playerId);
      }
      // if it's this player's turn
      if (prevPhase !== phase && currentPlayerId === userId) {
        setPrevPhase(phase);
        setCount(1)
        // Update the message based on the phase
        let newMessage = "";
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

      setMessage(newMessage);
      setIsVisible(true);
      }
      // if it's another player's turn
      else if (prevPlayerId !== currentPlayerId) {
        setPrevPlayerId(currentPlayerId);
        setCount(2);
        let newMessage = "Another player is on the move!";
        if (game?.turnCycle?.currentPlayer?.username) {
          newMessage = `${game.turnCycle.currentPlayer.username} is on the move! ${game.turnCycle.currentPlayer.playerId % game.players.length}`;
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
          ${(game.turnCycle.currentPlayer.playerId) % 6 === 0 ? "c1" : `
          ${(game.turnCycle.currentPlayer.playerId) % 6 === 1 ? "c2" : `
          ${(game.turnCycle.currentPlayer.playerId) % 6 === 2 ? "c3" : `
          ${(game.turnCycle.currentPlayer.playerId) % 6 === 3 ? "c4" : `
          ${(game.turnCycle.currentPlayer.playerId) % 6 === 4 ? "c5" : `
          ${(game.turnCycle.currentPlayer.playerId) % 6 === 5 ? "c6" : "c1"}`}`}`}`}`}`}`}>
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
