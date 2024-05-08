import React, { useEffect, useState } from "react";
import "styles/ui/RiskCardModal.scss";
import { Spinner } from "components/ui/Spinner";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import RiskCard from "../ui/RiskCard";
import { Player, Card } from "types";
import ApiStyles from "helpers/avatarApiStyles";
import {Button} from "../ui/Button";
import Game from "models/Game";

const RiskCardModal = ({ isModalOpen, onClose, lobbyId, gameId}) => {
    if (!isModalOpen) {
        return null;
    }

    const apiStyles = new ApiStyles;

    const [currentPlayer, setCurrentPlayer] = useState<Player>(null);
    const [cards, setCards] = useState<Card[]>([{troops: "0", territoryName: "Brazil", id: 0}, {troops: "0", territoryName: "Argentina", id: 1}, {troops: "0", territoryName: "South Africa", id: 2}, {troops: "2", territoryName: "South Africa", id: 3}, {troops: "2", territoryName: "China", id: 4}, {troops: "1", territoryName: "Southern Europe", id: 5}]);
    const [game, setGame] = useState<Game>(null);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [tradable, setTradable] = useState(false);

    useEffect(() => {
        
        async function fetchData() {

        try {
            const config1 = {Authorization: localStorage.getItem("lobbyToken")};

            //console.log("lobbyId: ", lobbyId);

            
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
    }, [game]);

    const trade = async() => {

    };

    useEffect(() => {
        console.log("selected cards:", selectedCards);
        console.log("cards:", cards);

        if(selectedCards.length >= 3){
            console.log("hello?")
            if(selectedCards[0].troops === selectedCards[1].troops && selectedCards[0].troops === selectedCards[2].troops){
                setTradable(true);
            }
            else if(selectedCards[0].troops !== selectedCards[1].troops && selectedCards[0].troops!== selectedCards[2].troops && selectedCards[1].troops !== selectedCards[2].troops){
                setTradable(true);
            }
        }
        else {
            setTradable(false);
        }
        
    }, [selectedCards, cards]);

    const handleCardClick = (troopNum: string, terName: string, idNum: number) => {
        
        const newCard: Card = {
            troops: troopNum,
            territoryName: terName,
            id: idNum
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
                    <li key={card.id}>
                        <div className="cardHolder" onClick={() => handleCardClick(card.troops, card.territoryName, card.id)}>
                            <RiskCard troop={card.troops} territoryName={card.territoryName} />
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="modal-cards" onClick={onClose}>
        <div className="modal-contentCards" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={onClose}>
            &times;
            </button>
            <main className="modal-mainContents">
                <div className="modal-selectedRiskCards">
                    <div className="modal-first" onClick={() => handleCardClick(selectedCards[0].troops, selectedCards[0].territoryName, selectedCards[0].id)}>
                        {selectedCards.length >= 1 && 
                            <RiskCard troop={selectedCards[0].troops} territoryName={selectedCards[0].territoryName}/>
                        }
                    </div>
                    <div className="modal-first" onClick={() => handleCardClick(selectedCards[1].troops, selectedCards[1].territoryName, selectedCards[1].id)}>
                        {selectedCards.length >= 2 && 
                            <RiskCard troop={selectedCards[1].troops} territoryName={selectedCards[1].territoryName}/>
                        }
                    </div>
                    <div className="modal-first" onClick={() => handleCardClick(selectedCards[2].troops, selectedCards[2].territoryName, selectedCards[2].id)}>
                        {selectedCards.length === 3 && 
                            <RiskCard troop={selectedCards[2].troops} territoryName={selectedCards[2].territoryName}/>
                        }
                    </div>
                </div>
                <div className="modal-explain">
                    Trade three cards with the same troops or one of each kind! (Jokers count as any troop)
                </div>
                <div className="modal-riskcards">
                    {content}
                </div>
                <div className="button-div">
                    {(true) && <Button width="50%" disabled={!tradable} onClick={trade}>Trade</Button>}
                </div>
            </main>
        </div>
        </div>
    );
};

RiskCardModal.propTypes = {
isModalOpen: PropTypes.bool.isRequired,
onClose: PropTypes.func.isRequired,
lobbyId: PropTypes.number.isRequired,
gameId: PropTypes.number.isRequired
};

export default RiskCardModal;