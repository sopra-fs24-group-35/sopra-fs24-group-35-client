import React, { useState, useEffect } from "react";
import "styles/views/GameScreen.scss";
import { api, handleError } from "helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "components/ui/Spinner";
import game from "./Game";
import { User } from "../../types";
import {Button} from "../ui/Button";
import ModalWin from "../ui/ModalWin";
import LoseModal from "../ui/LoseModal";
import AdjDict from '../../models/AdjDict.js';
import AttackModal from "../ui/AttackModal";
import RiskCardModal from "../ui/RiskCardModal";
import Game from "models/Game";
import ApiStyles from "helpers/avatarApiStyles";


const TitleScreen: React.FC = () => {

    const [game, setGame] = useState<Game>(null);
    const [phase, setPhase] = useState(null);
    const [currentPlayerId, setCurrentPlayerId] = useState(null);
    const [troopBonus, setTroopBonus] = useState(null);

    const buttonRefs = React.useRef<{ [key: string]: HTMLButtonElement }>({});
    const navigate = useNavigate();
    const styles = new ApiStyles;
    let [num, setNum] = useState(0);

    const CasualAvatar = "https://api.dicebear.com/8.x/shapes/svg?seed=Mittens";
    const [AllIDwithAvatar, setAllIDwithAvatar] = useState({});

    const {gameId} = useParams()
    const lobbyId = localStorage.getItem("lobbyId")
    const [startButton, setStartButton] = useState<string | null>(null);
    const adjDict = new AdjDict();
    //reload idea

    const [curx, setX] = useState(0);
    const [cury, setY] = useState(0);
    const [curwidth, setCurWidth] = useState(0);
    const [curheight, setCurHeight] = useState(0);

    const [PlayerColor, setPlayerColor] = useState({});
    const Colors = ["red", "blue", "purple", "green", "orange", "brown"];
    const [PlayerCycle, setPlayerCycle] = useState(null);
    const [curListOfValidReinforcements, setcurListOfValidReinforcements] = useState([]);
    const [CurrentHighlightedButtons, setCurrentHighlightedButtons] = useState(null);
    const NameCycle = ["Go to Attack", "Go to Troop Movement", "End The Turn"];
    const [CurrentText, setCurrentText] = useState("Go To Attack");
    const [isWinModalOpen, setIsWinModalOpen] = useState(false);
    const [isLoseModalOpen, setIsLoseModalOpen] = useState(false)
    const [WinLoseWasShown, setWinLoseWasShown] = useState(false)

    /*---------------Attack Modal Setup----------------*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moved, setMoved] = useState(false);
    const [modalContent, setModalContent] = useState({
        territory_def: "Add territory name here",
        territory_atk: "Add territory name here",
    });

    const openModal = (content) => {
        setIsModalOpen(true);
        setModalContent(JSON.parse(content));
        setStartButton(null);
    };

    const moving = () => {
        setMoved(true);
    };

    const closeModal = async () => {
        const updatedGame = await api.get(`/lobbies/${lobbyId}/game/${gameId}`, {headers: config});
        setGame(updatedGame.data);
        setIsModalOpen(false);
        setIsLoseModalOpen(false);
        setIsWinModalOpen(false);
        undoLine();
    };

    useEffect(() => {
        //console.log("isModalOpen", isModalOpen);
    }, [isModalOpen]);
    /*-------------------------------------------------*/

    /*--------------RiskCard Modal Setup---------------*/
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [traded, setTraded] = useState(false);

    const openCardModal = () => {
        setIsCardModalOpen(true);
    };

    const closeCardModal = async () => {
        const updatedGame = await api.get(`/lobbies/${lobbyId}/game/${gameId}`, {headers: config});
        //setGame(updatedGame.data);

        if (traded) {
            let troops = troopBonus;
            setTroopBonus(troops + updatedGame.data.turnCycle.currentPlayer.cardBonus);
        }
        
        setTraded(false);
        setIsCardModalOpen(false);
    };

    const trading = () => {
        setTraded(true);
    };

    useEffect(() => {
        //console.log("traded", traded);

        //these functions are only here to update the useState
    }, [isCardModalOpen, traded]);
    /*-------------------------------------------------*/

    const [buttonData, setButtonData] = useState([
        {id: 'Alaska', refKey: 'Alaska', text: 'Alaska', xratio: 0.08, yratio: 0.14, troops: 0, playerid: 0},
        {
            id: 'Northwest Territory',
            refKey: 'Northwest Territory',
            text: 'Northwest Territory',
            xratio: 0.18,
            yratio: 0.145,
            troops: 0,
            playerid: 0
        },
        {id: 'Greenland', refKey: 'Greenland', text: 'Greenland', xratio: 0.35, yratio: 0.1, troops: 0, playerid: 0},
        {id: 'Quebec', refKey: 'Quebec', text: 'Quebec', xratio: 0.3, yratio: 0.24, troops: 0, playerid: 0},
        {id: 'Ontario', refKey: 'Ontario', text: 'Ontario', xratio: 0.23, yratio: 0.24, troops: 0, playerid: 0},
        {id: 'Alberta', refKey: 'Alberta', text: 'Alberta', xratio: 0.16, yratio: 0.23, troops: 0, playerid: 0},
        {
            id: 'Western US',
            refKey: 'Western US',
            text: 'Western US',
            xratio: 0.18,
            yratio: 0.335,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Eastern US',
            refKey: 'Eastern US',
            text: 'Eastern US',
            xratio: 0.24,
            yratio: 0.37,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Central America',
            refKey: 'Central America',
            text: 'Central America',
            xratio: 0.185,
            yratio: 0.455,
            troops: 0,
            playerid: 0
        },

        {id: 'Venezuela', refKey: 'Venezuela', text: 'Venezuela', xratio: 0.26, yratio: 0.55, troops: 0, playerid: 0},
        {id: 'Brazil', refKey: 'Brazil', text: 'Brazil', xratio: 0.31, yratio: 0.63, troops: 0, playerid: 0},
        {id: 'Peru', refKey: 'Peru', text: 'Peru', xratio: 0.27, yratio: 0.676, troops: 0, playerid: 0},
        {id: 'Argentina', refKey: 'Argentina', text: 'Argentina', xratio: 0.28, yratio: 0.79, troops: 0, playerid: 0},

        {id: 'Ukraine', refKey: 'Ukraine', text: 'Ukraine', xratio: 0.582, yratio: 0.275, troops: 0, playerid: 0},
        {
            id: 'Northern Europe',
            refKey: 'Northern Europe',
            text: 'Northern Europe',
            xratio: 0.50,
            yratio: 0.33,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Southern Europe',
            refKey: 'Southern Europe',
            text: 'Southern Europe',
            xratio: 0.51,
            yratio: 0.425,
            troops: 0,
            playerid: 0
        },
        {id: 'Iceland', refKey: 'Iceland', text: 'Iceland', xratio: 0.435, yratio: 0.2, troops: 0, playerid: 0},
        {
            id: 'Western Europe',
            refKey: 'Western Europe',
            text: 'Western Europe',
            xratio: 0.43,
            yratio: 0.47,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Scandinavia',
            refKey: 'Scandinavia',
            text: 'Scandinavia',
            xratio: 0.505,
            yratio: 0.19,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Great Britain',
            refKey: 'Great Britain',
            text: 'Great Britain',
            xratio: 0.42,
            yratio: 0.315,
            troops: 0,
            playerid: 0
        },

        {id: 'Egypt', refKey: 'Egypt', text: 'Egypt', xratio: 0.54, yratio: 0.565, troops: 0, playerid: 0},
        {
            id: 'East Africa',
            refKey: 'East Africa',
            text: 'East Africa',
            xratio: 0.58,
            yratio: 0.656,
            troops: 0,
            playerid: 0
        },
        {id: 'Congo', refKey: 'Congo', text: 'Congo', xratio: 0.54, yratio: 0.72, troops: 0, playerid: 0},
        {
            id: 'South Africa',
            refKey: 'South Africa',
            text: 'South Africa',
            xratio: 0.55,
            yratio: 0.84,
            troops: 0,
            playerid: 0
        },
        {
            id: 'North Africa',
            refKey: 'North Africa',
            text: 'North Africa',
            xratio: 0.48,
            yratio: 0.6,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Madagascar',
            refKey: 'Madagascar',
            text: 'Madagascar',
            xratio: 0.627,
            yratio: 0.84,
            troops: 0,
            playerid: 0
        },

        {id: 'Indonesia', refKey: 'Indonesia', text: 'Indonesia', xratio: 0.805, yratio: 0.71, troops: 0, playerid: 0},
        {
            id: 'New Guinea',
            refKey: 'New Guinea',
            text: 'New Guinea',
            xratio: 0.884,
            yratio: 0.68,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Western Australia',
            refKey: 'Western Australia',
            text: 'Western Australia',
            xratio: 0.84,
            yratio: 0.85,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Eastern Australia',
            refKey: 'Eastern Australia',
            text: 'Eastern Australia',
            xratio: 0.915,
            yratio: 0.82,
            troops: 0,
            playerid: 0
        },

        {id: 'Ural', refKey: 'Ural', text: 'Ural', xratio: 0.685, yratio: 0.25, troops: 0, playerid: 0},
        {id: 'Siberia', refKey: 'Siberia', text: 'Siberia', xratio: 0.735, yratio: 0.16, troops: 0, playerid: 0},
        {id: 'Yakutsk', refKey: 'Yakutsk', text: 'Yakutsk', xratio: 0.805, yratio: 0.12, troops: 0, playerid: 0},
        {id: 'Irkutsk', refKey: 'Irkutsk', text: 'Irkutsk', xratio: 0.792, yratio: 0.25, troops: 0, playerid: 0},
        {id: 'Kamchatka', refKey: 'Kamchatka', text: 'Kamchatka', xratio: 0.88, yratio: 0.13, troops: 0, playerid: 0},
        {id: 'Japan', refKey: 'Japan', text: 'Japan', xratio: 0.895, yratio: 0.35, troops: 0, playerid: 0},
        {id: 'Mongolia', refKey: 'Mongolia', text: 'Mongolia', xratio: 0.805, yratio: 0.345, troops: 0, playerid: 0},
        {id: 'China', refKey: 'China', text: 'China', xratio: 0.76, yratio: 0.42, troops: 0, playerid: 0},
        {
            id: 'Afghanistan',
            refKey: 'Afghanistan',
            text: 'Afghanistan',
            xratio: 0.665,
            yratio: 0.36,
            troops: 0,
            playerid: 0
        },
        {
            id: 'Middle East',
            refKey: 'Middle East',
            text: 'Middle East',
            xratio: 0.61,
            yratio: 0.535,
            troops: 0,
            playerid: 0
        },
        {id: 'India', refKey: 'India', text: 'India', xratio: 0.715, yratio: 0.51, troops: 0, playerid: 0},
        {id: 'Siam', refKey: 'Siam', text: 'Siam', xratio: 0.785, yratio: 0.55, troops: 0, playerid: 0},
    ]);

    const config = {Authorization: localStorage.getItem("lobbyToken")};

    useEffect(() => {
        // Define the function to fetch game data
        async function getGame() {
            try {
                const gameResponse = await api.get(`/lobbies/${lobbyId}/game/${gameId}`, {headers: config});
                setGame(gameResponse.data);
                setPhase(gameResponse.data.turnCycle.currentPhase);
                setCurrentPlayerId(gameResponse.data.turnCycle.currentPlayer.playerId);
                console.log("current player: " + gameResponse.data.turnCycle.currentPlayer.playerId);
                setTroopBonus(gameResponse.data.turnCycle.currentPlayer.troopBonus);
                setPlayerCycle(gameResponse.data.turnCycle.playerCycle);

                if (gameResponse.data.turnCycle.currentPlayer.riskCards.length >= 5 && parseInt(localStorage.getItem("user_id")) === gameResponse.data.turnCycle.currentPlayer.playerId){
                    openCardModal();
                }
            } catch (error) {
                console.error("Error fetching game data:", error);
                // Handle error if needed
            }
        }

        // Call getGame initially
        getGame();

        // Set up the interval to call getGame every 2 seconds
        const intervalId = setInterval(() => {
            //console.log(currentPlayerId + "  ------------  " + parseInt(localStorage.getItem("user_id")));
            if (game !== null) {
                //console.log(game.turnCycle.currentPlayer.playerId);
            }
            if (game && currentPlayerId !== null) { // Check if game is not null
                if (parseInt(currentPlayerId) !== parseInt(localStorage.getItem("user_id"))) {
                    getGame();
                } else {
                }
            } else {
                getGame();
            }
        }, 2000);

        // Clean up the interval when the component unmounts or when the dependency array changes
        return () => clearInterval(intervalId);
    }, [currentPlayerId]);


    useEffect(() => {
        if (game !== null) {
            console.log("game: ", game);
            console.log("current phase: ", phase);
            console.log("current player id: ", currentPlayerId);
            console.log("current troop bonus: ", troopBonus);
            console.log("playerCycle:", PlayerCycle);
            if (currentPlayerId !== null) {
                setCurrentPlayerId(currentPlayerId);
            }

            let PlayerwithColors = {};
            let x = 0;
            if (PlayerCycle !== null) {
                for (const player of PlayerCycle) {
                    PlayerwithColors[player.playerId] = Colors[x];
                    x++;
                }
            }
            setPlayerColor(PlayerwithColors);

            for (let i = 0; i < buttonData.length; i++) {
                const territory = game.board.territories.find(territory => territory.name === buttonData[i].id);
                const button = buttonData[i];
                if (territory) {
                    button.troops = territory.troops;
                    button.playerid = territory.playerId;

                } else {
                    console.log("Territory not found for button:", button.id);
                }
                setButtonData([...buttonData]);
            }
            if (phase === "REINFORCEMENT") {
                setCurrentText(NameCycle[0]);
            } else if (phase === "ATTACK") {
                setCurrentText(NameCycle[1]);
            } else if (phase === "MOVE") {
                setCurrentText(NameCycle[2]);
            }

            if (phase === "MOVE" && moved) {
                nextState();
            }
            checkifyouHaveLostOrWon();

        }
    }, [game, phase, currentPlayerId]);

    const getButtonRatiosById = (id) => {
        const button = buttonData.find(button => button.id === id);
        return button ? {xratio: button.xratio, yratio: button.yratio} : {xratio: 0, yratio: 0}; // Return xratio and yratio if the button is found, otherwise return default values
    };

    const checkifyouHaveLostOrWon = () => {
        let won = true;
        let lose = true;
        if(game !== null && WinLoseWasShown === false) {
            for (const x of game.board.territories) {
                if (x.owner !== parseInt(localStorage.getItem("user_id"))) {
                    won = false;
                } else if (x.owner === parseInt(localStorage.getItem("user_id"))) {
                    lose = false
                }
            }
            if (won === true) {
                setIsWinModalOpen(true);
                setWinLoseWasShown(true);
            } else if (lose === true) {
                setIsLoseModalOpen(true);
                setWinLoseWasShown(true);
            }
        }
    }

    const checkForAllValidReinforcements = (id: string) => {
        const playerid = currentPlayerId;
        let validbuttonid = [];
        let buttonqueue = [id];
        let visited = {}; // Keep track of visited territories
        visited[id] = true; // Mark the starting territory as visited

        while (buttonqueue.length !== 0) {
            const curbut = buttonqueue.shift(); // Use shift() to dequeue the first element
            validbuttonid.push(curbut);
            // Iterate through adjacent territories
            for (const iterterritory of adjDict.dict[curbut]) {
                const nextterritory = game.board.territories.find(territory => territory.name === iterterritory);
                if (!visited[iterterritory] && nextterritory.owner === playerid) {
                    buttonqueue.push(iterterritory); // Enqueue unvisited adjacent territories
                    visited[iterterritory] = true; // Mark as visited
                }
            }
        }
        setcurListOfValidReinforcements(validbuttonid);
        setCurrentHighlightedButtons(validbuttonid);

        for (const button of validbuttonid) {
            const curbutton = buttonRefs.current[button]
            if (button === id) {
                curbutton.style.border = "2px double white";
                curbutton.style.padding = "5px"; // Example padding
            } else {
                curbutton.style.border = "2px solid white";
            }
        }
    }

    const checkifthereareenemies = (id: string) => {
        for (const thisterritory of adjDict.dict[id]) {
            const curterritory = game.board.territories.find(territory => territory.name === thisterritory);
            if (curterritory.owner !== currentPlayerId) {
                return true;
            }
        }
        return false;
    }

    const checkifthereareneighbors = (id: string) => {
        for (const thisterritory of adjDict.dict[id]) {
            const curterritory = game.board.territories.find(territory => territory.name === thisterritory);
            if (curterritory.owner === currentPlayerId) {
                return true;
            }
        }
        return false;
    }

    const handleButtonClick = (id: string) => {
        const territory = game.board.territories.find(territory => territory.name === id);
        if (phase === "REINFORCEMENT") {
            deploytroops(id);
        }
        if (phase === "ATTACK") {
            attackTerritory(id);
        }
        if (phase === "MOVE") {
            reinforceTroops(id);
        }
    }
    const deploytroops = (id: string) => {
        increaseTroops(id);
    }

    const attackTerritory = (id: string) => {
        const territory = game.board.territories.find(territory => territory.name === id);
        if (startButton) {
            console.log("startButton: ", startButton);
            console.log("is adj?", adjDict.dict[startButton].includes(id));
            console.log("is NOT currentPlayers?", territory.owner !== currentPlayerId);
            if (territory.owner !== currentPlayerId && adjDict.dict[startButton].includes(id)) {
                dehighlightadjbutton(startButton);
                drawLine(startButton, id);
                //setDrawingLine(true); // Enable drawing line mode
                const territory_def = id;
                const territory_atk = startButton;
                const cont = JSON.stringify({territory_def, territory_atk});
                openModal(cont);
                setStartButton(null);
            } else if (startButton === id) {
                setStartButton(null);
                dehighlightadjbutton(startButton);
            } else{
                if(territory.owner === currentPlayerId && checkifthereareenemies(id) && territory.troops > 1){
                dehighlightadjbutton(startButton);
                setStartButton(id);
                highlightadjbutton(id);}
            }
        } else {
            if(territory.owner === currentPlayerId && checkifthereareenemies(id) && territory.troops > 1){
            setStartButton(id);
            highlightadjbutton(id);
        }}
    }

    const reinforceTroops = (id: string) => {
        redirectTroops(id)
    }

    const nextState = async () => {

        if (phase === "MOVE") {
            setStartButton(null);
            if (startButton) {
                dehighlightadjbutton(startButton);
            }
            undoLine();
            setTroopBonus(game.turnCycle.currentPlayer.troopBonus);
        }
        else {
            if (startButton) {
                dehighlightadjbutton(startButton);
            }
            undoLine();
            setStartButton(null);
        }

        const requestBody = JSON.stringify({"board": game.board});
        const updateGame = await api.put(`/lobbies/${lobbyId}/game/${gameId}`, requestBody, {headers: config});

        setMoved(false);
        setGame(updateGame.data);
        setPhase(updateGame.data.turnCycle.currentPhase);
        setCurrentPlayerId(updateGame.data.turnCycle.currentPlayer.playerId);
        
    }

    const increaseTroops = (territory_id: string) => {
        const territory = game.board.territories.find(territory => territory.name === territory_id);
        const button = buttonData.find(button => button.id === territory_id); // Find the button data for the startId

        if (button && troopBonus !== 0 && territory.owner === currentPlayerId) {
            territory.troops += 1; // Increment the troops count
            button.troops = territory.troops; // set troop count to server troop count

            let troops = troopBonus;
            setTroopBonus(troops - 1);
            setButtonData([...buttonData]); // Update the button data array in the state
            setGame(game);
            if(troops - 1 === 0) {
                nextState();
            }
        }
    }

    const redirectTroops = (id: string) => {
        const territory = game.board.territories.find(territory => territory.name === id);
        if (startButton) {
            if (currentPlayerId === territory.owner && CurrentHighlightedButtons.includes(id) && id !== startButton) {
                dehighlightadjbutton(startButton);
                const button_from = buttonData.find(button => button.id === startButton); // Find the button data for the startId
                const button_to = buttonData.find(button => button.id === id);
                if (button_from && button_to && button_from.troops > 1) {
                    const territory_def = id;
                    const territory_atk = startButton;
                    const cont = JSON.stringify({territory_def, territory_atk});
                    openModal(cont);

                    setButtonData([...buttonData]); // Update the button data array in the state
                    setGame(game);
                    drawLine(startButton, id);
                }
                
            }
            else if (startButton === id && !moved) {
                setStartButton(null);
                dehighlightadjbutton(startButton);
            }
        } else if (currentPlayerId === territory.owner && checkifthereareneighbors(id) && territory.troops > 1 && !moved) {
                setStartButton(id);
                checkForAllValidReinforcements(id);
        }
    }

    const highlightadjbutton = (startId: string) => {
        //increaseTroops(startId);
        if (phase === "ATTACK") {
            const adjacentTerritories = adjDict.dict[startId];
            let enemyAdjacentTerritories = [];
            for (let name of adjacentTerritories) {
                const territory = game.board.territories.find(territory => territory.name === name);
                if (territory.owner !== currentPlayerId) {
                    enemyAdjacentTerritories.push(name);
                }
            }
            setCurrentHighlightedButtons(enemyAdjacentTerritories);
            for (const territory of enemyAdjacentTerritories) {
                const button = buttonRefs.current[territory];
                button.style.border = "2px solid white";
            }
            const button = buttonRefs.current[startId];
            button.style.border = "2px double white";
            button.style.padding = "5px"; // Example padding

        }
    }


    const dehighlightadjbutton = (startId: string) => {
        const adjacentTerritories = adjDict.dict[startId];
        for (const territory of adjacentTerritories) {
            const button = buttonRefs.current[territory]
            button.style.border = "2px solid black";
        }
        for (const territory of curListOfValidReinforcements) {
            const button = buttonRefs.current[territory]
            button.style.border = "2px solid black";
        }
        const button = buttonRefs.current[startButton];
        button.style.border = "2px solid black";
        button.style.padding = "0px"; // Example padding

    }

    const drawLine = (startId: string, endId: string) => {
        let {x: startx, y: starty} = getButtonCoordinatesById(startId);
        let {x: endx, y: endy} = getButtonCoordinatesById(endId);

        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        // Calculate a new endpoint that is 90% of the distance from the start point to the end point
        const distance = Math.sqrt(Math.pow(endx - startx, 2) + Math.pow(endy - starty, 2));

        let scaledPercentage = 0.8 + (0.99 - 0.8) * (distance - 50) / (200 - 50);


        let ratio = scaledPercentage; // Adjust this ratio as needed
        if (ratio > 1) {
            ratio = 0.982;
        }
        const newEndx = startx + ratio * (endx - startx);
        const newEndy = starty + ratio * (endy - starty);

        // Begin the path
        ctx.beginPath();
        // Move to the start point
        ctx.moveTo(startx, starty);
        // Draw a line to the new endpoint
        ctx.lineTo(newEndx, newEndy);
        ctx.lineWidth = 5;
        // Set line style
        ctx.strokeStyle = 'black'; // You can set any color you want
        // Draw the line
        ctx.stroke();

        const angle = Math.atan2(endy - starty, endx - startx);
        ctx.beginPath();
        // Calculate arrowhead points
        ctx.moveTo(newEndx, newEndy);
        ctx.lineTo(newEndx - 20 * Math.cos(angle - Math.PI / 6), newEndy - 20 * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(newEndx, newEndy);
        ctx.lineTo(newEndx - 20 * Math.cos(angle + Math.PI / 6), newEndy - 20 * Math.sin(angle + Math.PI / 6));
        // Set arrowhead style
        ctx.strokeStyle = 'black';
        // Draw the arrowhead
        ctx.stroke();

    };

    const undoLine = () => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const picture1 = require('../../styles/views/Pictures/RiskMap21.png');
        const image = new Image(picture1);
        // Clear the canvas
        ctx.clearRect(curx, cury, curwidth, curheight);
        ctx.drawImage(image, curx, cury, curwidth, curheight);

        //setReload(true);
    };

    const getButtonCoordinatesById = (id) => {
        const button = buttonRefs.current[id];
        if (button) {
            const rect = button.getBoundingClientRect();
            return {x: (rect.left + rect.right) / 2, y: (rect.top + rect.bottom) / 2};
        } else {
            return {x: 0, y: 0}; // Default position if button is not found
        }
    };

    //const redButton = document.getElementById('redButton');
    const containerStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: '10px',
        right: '0',
    };

    const imagePairStyle: React.CSSProperties = {
        display: 'flex',
    };

    const avatarStylePlaying: React.CSSProperties = {
        width: '75px', // Adjust the size of the circle
        height: '75px', // Adjust the size of the circle
        borderRadius: '50%', // Makes the image circular
        overflow: 'hidden', // Hides the overflow
        marginRight: '5px', // Adjust the space between images
        marginLeft: '5px', // Adjust the space between images
        border: '4px solid black', // Red outline
    };

    const avatarStyle: React.CSSProperties = {
        width: '75px', // Adjust the size of the circle
        height: '75px', // Adjust the size of the circle
        borderRadius: '50%', // Makes the image circular
        overflow: 'hidden', // Hides the overflow
        marginRight: '5px', // Adjust the space between image
        marginLeft: '5px', // Adjust the space between images
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Ensures the image covers the entire circle
    };
    const AvatarCreation = () => {
        let newNum = num + 1;
        if (newNum >= 4) {
            newNum = 0;
        }
        setNum(newNum);
    }

    const fetchData = async () => {
        try {
            const config = {Authorization: localStorage.getItem("lobbyToken")};
            // get lobby info
            const getLobbyResponse = await api.get(`/lobbies/${lobbyId}`, {headers: config});
            const lobbyData = getLobbyResponse.data;

            // set the userIdList to an array of longs consisting of all the user IDs in the lobby
            let userIdList = lobbyData.players;

            let playeridwithavatar = {};
            const config1 = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id")};

            if (PlayerCycle !== null) {
                for (const playerid of PlayerCycle) {
                    playeridwithavatar[playerid.playerId] = null;
                }

                for (const player of userIdList) {
                    const playerresponse = await api.get("/users/" + player, {headers: config1});
                    playeridwithavatar[playerresponse.data.id] = `https://api.dicebear.com/8.x/thumbs/svg?seed=${styles.styles[playerresponse.data.avatarId]}`;
                }
                let xnumber = -3;
                while (Object.keys(playeridwithavatar).length < 4) {
                    playeridwithavatar[xnumber] = CasualAvatar;
                    xnumber++;
                }
                setAllIDwithAvatar(playeridwithavatar);
            }

        } catch (error) {
            alert(`Something went wrong with fetching the user data: \n${handleError(error)}`);
        }
    };
    const nextSate = document.getElementById('nextState');

    useEffect(() => {
        // Function to preload the image
        const preloadImage = (url) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = reject;
                image.src = url;
            });
        };

        // Preload the image
        const imageSrc = require('../../styles/views/Pictures/RiskMap21.png');
        preloadImage(imageSrc).then((image: HTMLImageElement) => {

                // Once the image is fully loaded, update the canvas
                fetchData();
                const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
                const ctx = canvas.getContext('2d');

                const resizeCanvas = () => {
                    canvas.width = canvas.parentElement.clientWidth;
                    canvas.height = canvas.parentElement.clientHeight;
                    let aspectRatio = 0

                    aspectRatio = image.width / image.height;

                    let drawWidth = canvas.width;
                    let drawHeight = canvas.height;

                    // Adjust the size of the image to maintain aspect ratio
                    if (drawWidth / drawHeight > aspectRatio) {
                        drawWidth = drawHeight * aspectRatio;
                    } else {
                        drawHeight = drawWidth / aspectRatio;
                    }

                    const x = (canvas.width - drawWidth) / 2;
                    const y = (canvas.height - drawHeight) / 2;

                    setCurHeight(drawHeight);
                    setCurWidth(drawWidth);
                    setX(x);
                    setY(y);

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, x, y, drawWidth, drawHeight);
                    resizeButtons(x, y, drawWidth, drawHeight);
                };

                const resizeButtons = (startx: number, starty: number, drawWidth: number, drawHeight: number) => {
                    const buttonWidth = drawWidth * 0.03; // Button width as a percentage of the draw width
                    const buttonHeight = drawHeight * 0.05; // Button height as a percentage of the draw height

                    Object.keys(buttonRefs.current).forEach((buttonId: string) => {
                        const button = buttonRefs.current[buttonId];
                        const {x, y} = calculateButtonPosition(drawWidth, drawHeight, startx, starty, buttonId);

                        button.style.left = `${x}px`;
                        button.style.top = `${y}px`;
                        button.style.width = `${buttonWidth}px`;
                        button.style.height = `${buttonHeight}px`;
                        button.style.fontSize = `${buttonHeight * 0.35}px`;


                        if (game !== null) {
                            const territory = game.board.territories.find(territory => territory.name === buttonId);
                            button.style.backgroundColor = PlayerColor[territory.owner];
                        }

                    });

                    //Dynamically Adjust heigh and Widgt of the lower Textboxes
                    //const troopAmountDiv = document.getElementById('nextState');
                    let allbuttons = document.querySelectorAll('.dynbut');
                    let buttonsArray = Array.from(allbuttons); // Convert NodeList to Array
                    for (const but of buttonsArray) {
                        (but as HTMLButtonElement).style.height = `${buttonHeight * 2.5}px`;
                        (but as HTMLButtonElement).style.width = `${buttonWidth * 9}px`;
                        (but as HTMLButtonElement).style.fontSize = `${buttonHeight * 0.35 * 2.5}px`;
                    }

                    allbuttons = document.querySelectorAll('.avatar');
                    buttonsArray = Array.from(allbuttons); // Convert NodeList to Array
                    for (const but of buttonsArray) {
                        (but as HTMLButtonElement).style.height = `${buttonHeight * 2.5}px`;
                        (but as HTMLButtonElement).style.width = `${buttonWidth * 20}px`;
                    }

                };

                const calculateButtonPosition = (drawWidth: number, drawHeight: number, startx: number, starty: number, buttonId: string) => {
                    const {xratio, yratio} = getButtonRatiosById(buttonId)
                    let x = startx + drawWidth * xratio; // Default left position
                    let y = starty + drawHeight * yratio; // Default top position

                    return {x, y};
                };

                // Initial setup
                resizeCanvas();

                // Handle resize event
                window.addEventListener('resize', resizeCanvas);

                return () => {
                    window.removeEventListener('resize', resizeCanvas);
                };
            }
        );

    }, [PlayerColor]);

    function getAvatarSrc(x: number) {
        if (PlayerCycle !== null && PlayerCycle.length > x) {
            return AllIDwithAvatar[PlayerCycle[x].playerId];
        } else {
            return CasualAvatar;
        }
    }

    function getcurrentAvatarColor(x) {
        if (PlayerCycle !== null && PlayerCycle.length > x && PlayerCycle[x].playerId === currentPlayerId) {
            return `2px solid black`;
        } else {
            return "2px solid transparent"; // Return empty string if x is out of bounds or PlayerCycle[x] is falsy
        }
    }

    function getAvatarColor(x) {
        if (PlayerCycle !== null && PlayerCycle.length > x) {
            if (PlayerCycle[x].playerId === currentPlayerId) {
                return `6px double ${PlayerColor[PlayerCycle[x].playerId]}`;
            } else {
                return `4px solid ${PlayerColor[PlayerCycle[x].playerId]}`;
            }
        } else {
            return "2px solid transparent"; // Return empty string if x is out of bounds or PlayerCycle[x] is falsy
        }
    }

    let lowerContent = (<div className="gamescreen-innerlower-container">
        <div className="gamescreen-bottomleft-container">
            <button
                id="nextState"
                className="dynbut gamescreen-buttons-container"
                style={{
                    left: '7%',
                    top: '50%',
                    backgroundColor: 'red',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    if (troopBonus !== 0 && phase === "REINFORCEMENT") {
    
                    }
                    else {
                        const cur = nextState();
                    }
                }}
                disabled={parseInt(currentPlayerId) !== parseInt(localStorage.getItem("user_id"))}
            >
                {CurrentText}
            </button>
            <Button
                width="100%"
                onClick={() => openCardModal()}>
                RiskCard Modal
            </Button>
            {troopBonus !== 0 && phase === "REINFORCEMENT" && (() => {
                if (parseInt(currentPlayerId) === parseInt(localStorage.getItem("user_id"))) {
                    return (
                        <div
                            id="nextState"
                            className="dynbut gamescreen-buttons-container"
                            style={{
                                left: 'calc(45% + 25px)',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'red',
                            }}
                            disabled={parseInt(currentPlayerId) !== parseInt(localStorage.getItem("user_id"))}
                        >
                            Troop Amount: {troopBonus}
                        </div>
                    );
                }
            })()}
        </div>
        <div className="gamescreen-bottomright-container">
            {num !== 1 ? (
                <div className="avatar" id={'avatar0'} style={{...avatarStyle, border: `${getAvatarColor(0)}`}}>
                    <img src={getAvatarSrc(0)} alt="avatar" style={imageStyle}/>
                </div>
            ) : (
                <div className="avatar" style={{avatarStylePlaying}}>
                    <img src={getAvatarSrc(0)} alt="avatar" style={imageStyle}/>
                </div>
            )}
            {num !== 1 ? (
                <div className="avatar" id={'avatar1'} style={{...avatarStyle, border: `${getAvatarColor(1)}`}}>
                    <img src={getAvatarSrc(1)} alt="avatar" style={imageStyle}/>
                </div>
            ) : (
                <div className="avatar" style={avatarStylePlaying}>
                    <img src={getAvatarSrc(1)} alt="avatar" style={imageStyle}/>
                </div>
            )}
            {num !== 2 ? (
                <div className="avatar" id={'avatar2'} style={{...avatarStyle, border: `${getAvatarColor(2)}`}}>
                    <img src={getAvatarSrc(2)} alt="avatar" style={imageStyle}/>
                </div>
            ) : (
                <div className="avatar" style={avatarStylePlaying}>
                    <img src={getAvatarSrc(2)} alt="avatar" style={imageStyle}/>
                </div>
            )}
            {num !== 3 ? (
                <div className="avatar" id={'avatar3'} style={{...avatarStyle, border: `${getAvatarColor(3)}`}}>
                    <img src={getAvatarSrc(3)} alt="avatar" style={imageStyle}/>
                </div>
            ) : (
                <div className="avatar" style={avatarStylePlaying}>
                    <img src={getAvatarSrc(3)} alt="avatar" style={imageStyle}/>
                </div>
            )}
        </div>
    </div>);

    let content = <Spinner/>;

    if(game){
        content = buttonData.map((button) => (
            <button
                key={button.id}
                id={button.id}
                ref={(buttonRef) => {
                    if (buttonRef) buttonRefs.current[button.refKey] = buttonRef;
                }}
                className="button"
                style={{}}
                onClick={() => handleButtonClick(button.id)}
                disabled={parseInt(currentPlayerId) !== parseInt(localStorage.getItem("user_id"))}
            >
                {button.troops}
            </button>
        ));
    }

    return (
        <div className="gamescreen-container">
            <div className="gamescreen-innerupper-container">
                {/*Attack Modal Section*/}
                <section>
                    <AttackModal
                        isModalOpen={isModalOpen}
                        modalContent={modalContent}
                        onClose={closeModal}
                        onMove={moving}
                        lobbyId={lobbyId}
                        gameId={gameId}
                    />
                    <RiskCardModal
                        isModalOpen={isCardModalOpen}
                        onClose={closeCardModal}
                        onTrade={trading}
                        lobbyId={lobbyId}
                        gameId={gameId}
                    />
                    <LoseModal
                        isModalOpen={isLoseModalOpen}
                        onClose={closeModal}
                    />
                    <ModalWin
                        isModalOpen={isWinModalOpen}
                        onClose={closeModal}
                    />
                </section>
                <canvas id="myCanvas"></canvas>
                {content}
            </div>
            {lowerContent}

        </div>
    );
}

export default TitleScreen;


