import React, { useEffect, useState } from "react";
import "styles/ui/Modal.scss";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import { User } from "types";
import ApiStyles from "helpers/avatarApiStyles";
import {Button} from "../ui/Button";

const AttackModal = ({ isModalOpen, modalContent, onClose, lobbyId, gameId }) => {
  if (!isModalOpen) {
    return null;
  }

  const apiStyles = new ApiStyles;

  const [attacker, setAttacker] = useState<User>(null);
  const [defender, setDefender] = useState<User>(null);

  const [defenseTerritory, setDefenseTerritory] = useState(null);
  const [attackTerritory, setAttackTerritory] = useState(null);

  const [selectedTroops, setSelectedTroops] = useState(3);
  const [selectedAttacks, setSelectedAttacks] = useState(10);
  //console.log("selectedTroops", selectedTroops);

  useEffect(() => {
    
    async function fetchData() {

      try {
        const config1 = {Authorization: localStorage.getItem("lobbyToken")};

        //console.log("lobbyId: ", lobbyId);

        const getDefenderTerritory = await api.get(`/lobbies/${lobbyId}/game/${gameId}/territory/${modalContent.territory_def}`, {headers: config1});

        setDefenseTerritory(getDefenderTerritory.data);

        const getAttackerTerritory = await api.get(`/lobbies/${lobbyId}/game/${gameId}/territory/${modalContent.territory_atk}`, {headers: config1});
        
        setAttackTerritory(getAttackerTerritory.data);

        //console.log("defender territory: ", getDefenderTerritory);

        const defenderId =  getDefenderTerritory.data.owner;

        const attackerId = getAttackerTerritory.data.owner;

        const config2 = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id")};

        const def = await api.get(`/users/${defenderId}`, {headers: config2});
        
        const atk = await api.get(`/users/${attackerId}`, {headers: config2});

        const def_data = def;

        //console.log("defendant: ", def);

        setDefender(def.data);

        setAttacker(atk.data);

        //console.log("Def username: ", defender.username);

      } catch (error) {
        console.error(
        `Something went wrong while fetching the users: \n${handleError(
            error
        )}`
        );
        console.error("Details:", error);
        alert(
        "Something went wrong while fetching the users! See the console for details."
        );
      }
    }    
    
    fetchData();
  }, []);

  const attack = async() => {
    const config = { Authorization: localStorage.getItem("lobbyToken") };
    const requestBody = JSON.stringify({"attackingTerritory" : attackTerritory.name,"defendingTerritory" : defenseTerritory.name, "troopsAmount" : selectedTroops,"repeats" : selectedAttacks});
    console.log("requestBody: ", requestBody);
    const attackResponse = await api.post(`lobbies/${lobbyId}/game/${gameId}/attacks`, requestBody, {headers: config});
  }

  const Player = ({ user }: { user: User }) => (
      <div className="player cont">
        <img className="player avatar" src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${apiStyles.styles[user.avatarId]}`} alt="Avatar" />
        <div className="player username">{user.username}</div>
      </div>
  );

    
  Player.propTypes = {
  user: PropTypes.object,
  };

  let numberOfTroops = 3; 

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <main className="modal-mainContents">
          <div className="modal-info-container">
            <div className="defender-info">
              <h5 className="modal-title">DEFENDER</h5>
              {defender && <Player user={defender} />}
            </div>
            <p className="vs-text">VS</p>
            <div className="attacker-info">
              <h5 className="modal-title">ATTACKER</h5>
              {attacker && <Player user={attacker} />}
            </div>
          </div>
          <div className="modal-info-container">
            <div className="defense-territory-info">
              <h5 className="modal-title">{modalContent.territory_def}</h5>
              <h5 className="troopInfo">Enemy Troops: {defenseTerritory && defenseTerritory.troops}</h5>
            </div>
            <p className="vs-text">VS</p>
            <div className="attack-territory-info">
              <h5 className="modal-title">{modalContent.territory_atk}</h5>
              <h5 className="troopInfo">Your Troops: {attackTerritory && attackTerritory.troops}</h5>
              <div className="selectables">
                <label className="select-label">
                  Troops:
                  <select className="select" value={selectedTroops} onChange={e => setSelectedTroops(e.target.value)}>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                  </select>
                </label>
                <hr className="hr"/>
                <label className="select-label">
                  Attacks:
                  <select className="select" value={selectedAttacks} onChange={e => setSelectedAttacks(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className="button-div">
            <Button width="50%" onClick={attack}>Attack</Button>
          </div>
        </main>
      </div>
    </div>
  );
};

AttackModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  modalContent: PropTypes.shape({
    territory_def: PropTypes.string.isRequired,
    territory_atk: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  lobbyId: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired
};

export default AttackModal;
