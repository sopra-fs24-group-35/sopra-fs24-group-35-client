import React, { useEffect, useState } from "react";
import "styles/ui/RiskCardModal.scss";
import { Spinner } from "components/ui/Spinner";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import RiskCard from "../ui/RiskCard";
import { Card } from "types";
import { Button } from "../ui/Button";
import Game from "models/Game";

const RiskCardModal = ({ isModalOpen, isMidTurn, onClose, onTrade, lobbyId, gameId, additionalTime, setAdditionalTime }) => {
    if (!isModalOpen) {
        return null;
    }

    const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
    const [currentPhase, setCurrentPhase] = useState<string | null>(null);
    const [cards, setCards] = useState<Card[] | null>(null);
    const [game, setGame] = useState<Game | null>(null);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [tradable, setTradable] = useState(false);
    const [owned, setOwned] = useState<Card[]>([]);
    const [troopBonus, setTroopBonus] = useState(0);
    const [traded, setTraded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const config = { Authorization: localStorage.getItem("lobbyToken") };

                const gameResponse = await api.get(`/lobbies/${lobbyId}/game/${gameId}`, { headers: config });

                const players = gameResponse.data.players;
                const curPlayer = gameResponse.data.turnCycle.currentPlayer;

                if (parseInt(localStorage.getItem("user_id")) === curPlayer.playerId) {
                    setIsCurrentPlayer(true);
                } else {
                    setIsCurrentPlayer(false);
                }

                setCurrentPhase(gameResponse.data.turnCycle.currentPhase);

                for (let player of players) {
                    if (player.playerId === parseInt(localStorage.getItem("user_id"))) {
                        setCards(player.riskCards);
                        break;
                    }
                }
                setGame(gameResponse.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the game data: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the game data! See the console for details.");
            }
        }

        fetchData();
    }, [gameId, lobbyId]);

    const trade = async () => {
        setAdditionalTime(15);
        const config = { Authorization: localStorage.getItem("lobbyToken") };
        const requestBody = JSON.stringify({
            "card1Name": selectedCards[0].territoryName,
            "card2Name": selectedCards[1].territoryName,
            "card3Name": selectedCards[2].territoryName
        });
        const tradeResponse = await api.post(`/lobbies/${lobbyId}/game/${gameId}/cards`, requestBody, { headers: config });
        
        setSelectedCards([]);
        setGame(tradeResponse.data);
        onTrade(true);
        setTraded(true);
    };

    useEffect(() => {
        if (game) {
            setOwned([]);
            let tempArray = [];
            for (let territory of game.board.territories) {
                for (let selectedCard of selectedCards) {
                    if (selectedCard.territoryName === territory.name && territory.owner === game.turnCycle.currentPlayer.playerId) {
                        tempArray.push(selectedCard);
                    }
                }
            }
            setOwned(tempArray);

            let bonus = calculateTroopBonus(selectedCards);
    
            if (selectedCards.length === 3 && bonus > 0) {
                
                if (tempArray.length === 1) {
                    bonus += 1;
                } else if (tempArray.length === 2) {
                    bonus += 2;
                } else if (tempArray.length === 3) {
                    bonus += 6;
                }

                setTradable(true);
                setTroopBonus(bonus);
            }
            else {
                setTradable(false);
            }
        } 
        else {
            setTradable(false);
        }
    }, [selectedCards, cards]);
    

    useEffect(() => {
        console.log("owned", owned);
    }, [owned])

    useEffect(() => {
        if (game && cards.length < 3 && traded) {
            onClose(true);
        }
    }, [game])

    function calculateTroopBonus(selectedCards: Card[]): number {
        if (selectedCards.length !== 3) {
            return 0; // Return 0 if not exactly 3 cards
        }
    
        const [card1, card2, card3] = selectedCards;
        const troopTypes = [card1.troops, card2.troops, card3.troops];
    
        // Count the number of jokers
        const jokerCount = troopTypes.filter(type => type === 0).length;
    
        // Remove jokers from the troopTypes array for easier processing
        const nonJokerTypes = troopTypes.filter(type => type !== 0);
    
        // Determine if the non-joker cards are valid for trading
        let isValidTrade = false;
        if (jokerCount === 0) {
            // No jokers: check if all same type or one of each type
            const uniqueTypes = new Set(nonJokerTypes);
            isValidTrade = (uniqueTypes.size === 1) || (uniqueTypes.size === 3);
        } else if (jokerCount === 1) {
            // One joker: check if the other two are the same type or one of each remaining type
            const uniqueTypes = new Set(nonJokerTypes);
            isValidTrade = (uniqueTypes.size <= 2);
        } else if (jokerCount === 2) {
            // Two jokers: always valid
            isValidTrade = true;
        }
    
        if (!isValidTrade) {
            return 0; // Return 0 if cards are not valid for trading
        }
    
        // Calculate card bonus
        const troopValues = selectedCards.map(card => {
            switch (card.troops) {
                case 1: return 1; // Infantry
                case 2: return 4; // Cavalry
                case 3: return 13; // Artillery
                default: return 0; // Joker
            }
        });
    
        const cSum = troopValues.reduce((sum, value) => sum + value, 0);
    
        let cardBonus = 0;
        if ([18, 17, 14, 13, 5, 4].includes(cSum) || cSum < 3) {
            cardBonus = 10; // 3 different cards
        } else if (cSum % 13 === 0) {
            cardBonus = 8; // 3x Artillery
        } else if (cSum % 4 === 0) {
            cardBonus = 6; // 3x Cavalry
        } else if (cSum % 1 === 0) {
            cardBonus = 4; // 3x Infantry
        }
    
        return cardBonus;
    }
    

    const handleCardClick = (troopNum: number, terName: string) => {
        if ((currentPhase === "REINFORCEMENT") || (currentPhase === "ATTACK" && ((cards.length + selectedCards.length) >= 5) && isMidTurn)) {
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
        } else {
            console.log('Condition not met for REINFORCEMENT or ATTACK phases', currentPhase, cards.length);
        }
    };

    let content = <Spinner />

    if (cards) {
        content = (
            <ul className="card-list">
                {cards.map((card: Card) => (
                    <li key={card.territoryName}>
                        <div className="cardHolder" onClick={() => handleCardClick(card.troops, card.territoryName)}>
                            {console.log("isOwned", owned.some(ownedCard => ownedCard.territoryName === card.territoryName))}
                            <RiskCard troop={card.troops} territoryName={card.territoryName} isOwned={owned.some(ownedCard => ownedCard.territoryName === card.territoryName)} />
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="modal-cards" onClick={(((currentPhase === "REINFORCEMENT" && (cards.length + selectedCards.length) >= 5) || (currentPhase === "ATTACK" && cards && isMidTurn && (cards.length + selectedCards.length) >= 5)) && isCurrentPlayer) ? null : (onClose)}>
            <div className="modal-contentCards" onClick={e => e.stopPropagation()}>
                <button className="close" onClick={(((currentPhase === "REINFORCEMENT" && (cards.length + selectedCards.length) >= 5) || (currentPhase === "ATTACK" && cards && isMidTurn && (cards.length + selectedCards.length) >= 5)) && isCurrentPlayer) ? null : (onClose)}>
                    &times;
                </button>
                <main className="modal-mainContents">
                    {((currentPhase === "REINFORCEMENT" || (currentPhase === "ATTACK" && cards && isMidTurn && (cards.length + selectedCards.length) >= 5)) && isCurrentPlayer) &&
                        <div className="modal-selectedRiskCards">
                            <div className="modal-first" onClick={() => handleCardClick(selectedCards[0].troops, selectedCards[0].territoryName)}>
                                {selectedCards.length >= 1 &&
                                    <RiskCard troop={selectedCards[0].troops} territoryName={selectedCards[0].territoryName} isOwned={owned.some(ownedCard => ownedCard.territoryName === selectedCards[0].territoryName)} />
                                }
                            </div>
                            <div className="modal-first" onClick={() => handleCardClick(selectedCards[1].troops, selectedCards[1].territoryName)}>
                                {selectedCards.length >= 2 &&
                                    <RiskCard troop={selectedCards[1].troops} territoryName={selectedCards[1].territoryName} isOwned={owned.some(ownedCard => ownedCard.territoryName === selectedCards[1].territoryName)} />
                                }
                            </div>
                            <div className="modal-first" onClick={() => handleCardClick(selectedCards[2].troops, selectedCards[2].territoryName)}>
                                {selectedCards.length === 3 &&
                                    <RiskCard troop={selectedCards[2].troops} territoryName={selectedCards[2].territoryName} isOwned={owned.some(ownedCard => ownedCard.territoryName === selectedCards[2].territoryName)} />
                                }
                            </div>
                        </div>
                    }
                    <div className="modal-explain">
                        {((currentPhase === "REINFORCEMENT" || (currentPhase === "ATTACK" && cards && isMidTurn && (cards.length + selectedCards.length) >= 5)) && isCurrentPlayer) && "Trade three cards with the same troops or one of each kind! (Jokers count as any troop)"}
                    </div>
                    <div className="modal-riskcards">
                        {content}
                    </div>
                    <div className="troopCount-container">
                        <div className="troop-count">
                            {(selectedCards.length === 3 && tradable) && (`You will receive ${troopBonus} troops`)}
                        </div>
                    </div>
                    <div className="button-div">
                        {((currentPhase === "REINFORCEMENT" || (currentPhase === "ATTACK" && cards && isMidTurn && (cards.length + selectedCards.length) >= 5)) && isCurrentPlayer) && <Button width="50%" disabled={!tradable} onClick={trade}>Trade</Button>}
                    </div>
                </main>
            </div>
        </div>
    );
};

RiskCardModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    isMidTurn: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onTrade: PropTypes.func.isRequired,
    lobbyId: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    additionalTime: PropTypes.number.isRequired,
    setAdditionalTime: PropTypes.func.isRrquired
};

export default RiskCardModal;
