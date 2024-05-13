import React, { useEffect, useState } from "react";
import "styles/ui/RiskCardModal.scss";
import { Spinner } from "components/ui/Spinner";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import RiskCard from "../ui/RiskCard";
import { Card } from "types";
import {Button} from "../ui/Button";
import Game from "models/Game";

const RiskCardModal = ({ isModalOpen, onClose, onTrade, lobbyId, gameId}) => {
    if (!isModalOpen) {
        return null;
    }

    const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
    const [currentPhase, setCurrentPhase] = useState(null);
    const [cards, setCards] = useState<Card[]>(null);
    const [game, setGame] = useState<Game>(null);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [tradable, setTradable] = useState(false);

    useEffect(() => {
        
        async function fetchData() {

        try {
            const config = {Authorization: localStorage.getItem("lobbyToken")};

            const gameResponse = await api.get(`/lobbies/${lobbyId}/game/${gameId}`, {headers: config});

            const players = gameResponse.data.players;

            const curPlayer = gameResponse.data.turnCycle.currentPlayer;

            if (parseInt(localStorage.getItem("user_id")) === curPlayer.playerId) {
                setIsCurrentPlayer(true);
            }
            else {
                setIsCurrentPlayer(false);
            }

            setCurrentPhase(gameResponse.data.turnCycle.currentPhase);

            for (let player of players){
                console.log("player", player);
                if(player.playerId === parseInt(localStorage.getItem("user_id"))){
                    setCards(player.riskCards);
                    break;
                }
            }
        } catch (error) {
            console.error(
            `Something went wrong while fetching the game data: \n${handleError(
                error
            )}`
            );
            console.error("Details:", error);
            alert(
            "Something went wrong while fetching the game data! See the console for details."
            );
        }
        }    

        fetchData();
    }, [game]);

    const trade = async() => {
        const config = { Authorization: localStorage.getItem("lobbyToken") };
        const requestBody = JSON.stringify({"card1Name": selectedCards[0].territoryName, "card2Name": selectedCards[1].territoryName, "card3Name": selectedCards[2].territoryName});
        const tradeResponse = await api.post(`/lobbies/${lobbyId}/game/${gameId}/cards`, requestBody, {headers: config});
        console.log("tradeResponse: ", tradeResponse.data);
        onTrade(true);
        setSelectedCards([]);
        setGame(tradeResponse.data);
    };

    useEffect(() => {
        console.log("selected cards:", selectedCards);
        console.log("cards:", cards);

        if(selectedCards.length >= 3){
            console.log("hello?")
            if((selectedCards[0].troops === selectedCards[1].troops && selectedCards[0].troops === selectedCards[2].troops) || (selectedCards[0].troops === selectedCards[1].troops && selectedCards[2].troops === 0) || (selectedCards[1].troops === selectedCards[2].troops && selectedCards[0].troops === 0) || (selectedCards[0].troops === selectedCards[2].troops && selectedCards[1].troops === 0)){
                setTradable(true);
            }
            else if((selectedCards[0].troops !== selectedCards[1].troops && selectedCards[0].troops!== selectedCards[2].troops && selectedCards[1].troops !== selectedCards[2].troops) || (selectedCards[0].troops !== selectedCards[1].troops && selectedCards[2].troops === 0) || (selectedCards[1].troops !== selectedCards[2].troops && selectedCards[0].troops === 0) || (selectedCards[0].troops !== selectedCards[2].troops && selectedCards[1].troops === 0)){
                setTradable(true);
            }
        }
        else {
            setTradable(false);
        }
        
    }, [selectedCards, cards]);

    useEffect(() => {
        console.log("isCurPlayer", isCurrentPlayer);
    }, [isCurrentPlayer, currentPhase]);

    const handleCardClick = (troopNum: number, terName: string) => {
        
        const newCard: Card = {
            troops: troopNum,
            territoryName: terName
        };

        // Check if the card is already selected
        const isSelected = selectedCards.some(card => card.troops === newCard.troops && card.territoryName === newCard.territoryName);

        // Check if the card is already selected
        if (isSelected) {
            // If already selected, remove it from the selected cards
            setSelectedCards(selectedCards.filter(card => card.troops !== newCard.troops || card.territoryName !== newCard.territoryName));
            setCards([...cards, newCard]);
        } else {
            if (selectedCards.length === 3) {
                // If maximum length is reached, prevent adding a new card
                console.log("Maximum number of cards selected");
                return;
            }
            // If not selected, add it to the selected cards
            setSelectedCards([...selectedCards, newCard]);
            setCards(cards.filter(card => card.troops !== newCard.troops || card.territoryName !== newCard.territoryName));
        }
    };

    let content = <Spinner/>

    if(cards){
        content = (
            <ul className="card-list">
                {cards.map((card: Card) => (
                    <li key={card.territoryName}>
                        <div className="cardHolder" onClick={() => handleCardClick(card.troops, card.territoryName)}>
                            <RiskCard troop={card.troops} territoryName={card.territoryName} />
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="modal-cards" onClick={(cards && cards.length >= 5 && isCurrentPlayer) ? null : (onClose)}>
        <div className="modal-contentCards" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={(cards && cards.length >= 5 && isCurrentPlayer) ? null : (onClose)}>
            &times;
            </button>
            <main className="modal-mainContents">
                {(currentPhase === "REINFORCEMENT" && isCurrentPlayer) &&
                <div className="modal-selectedRiskCards">  
                    <div className="modal-first" onClick={() => handleCardClick(selectedCards[0].troops, selectedCards[0].territoryName)}>
                        {selectedCards.length >= 1 && 
                            <RiskCard troop={selectedCards[0].troops} territoryName={selectedCards[0].territoryName}/>
                        }
                    </div>
                    <div className="modal-first" onClick={() => handleCardClick(selectedCards[1].troops, selectedCards[1].territoryName)}>
                        {selectedCards.length >= 2 && 
                            <RiskCard troop={selectedCards[1].troops} territoryName={selectedCards[1].territoryName}/>
                        }
                    </div>
                    <div className="modal-first" onClick={() => handleCardClick(selectedCards[2].troops, selectedCards[2].territoryName)}>
                        {selectedCards.length === 3 && 
                            <RiskCard troop={selectedCards[2].troops} territoryName={selectedCards[2].territoryName}/>
                        }
                    </div>
                </div>
                }
                <div className="modal-explain">
                    {(currentPhase === "REINFORCEMENT" && isCurrentPlayer) && "Trade three cards with the same troops or one of each kind! (Jokers count as any troop)"}
                </div>
                <div className="modal-riskcards">
                    {content}
                </div>
                <div className="button-div">
                    {(currentPhase === "REINFORCEMENT" && isCurrentPlayer) && <Button width="50%" disabled={!tradable} onClick={trade}>Trade</Button>}
                </div>
            </main>
        </div>
        </div>
    );
};

RiskCardModal.propTypes = {
isModalOpen: PropTypes.bool.isRequired,
onClose: PropTypes.func.isRequired,
onTrade: PropTypes.func.isRequired,
lobbyId: PropTypes.string.isRequired,
gameId: PropTypes.string.isRequired
};

export default RiskCardModal;