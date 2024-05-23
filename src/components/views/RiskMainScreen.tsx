import React, { useState , useEffect } from "react" ;
import "styles/views/GameScreen.scss";
// @ts-ignore
import defeatIcon from "./defeatIcon1.png";
// @ts-ignore
import currentPlayerArrow from "./currentPlayerIconV2.png";
// @ts-ignore
import bonusIcon from "../../styles/views/Pictures/bonusIcon.png";
// @ts-ignore
import territoryIcon from "styles/views/Pictures/territoryIcon.png";
// @ts-ignore
import troopsIcon from "styles/views/Pictures/troopsIcon.png";

// @ts-ignore
import cardIcon0 from "styles/views/Pictures/rc0.png";
// @ts-ignore
import cardIcon1 from "styles/views/Pictures/rc1.png";
// @ts-ignore
import cardIcon2 from "styles/views/Pictures/rc2.png";
// @ts-ignore
import cardIcon3 from "styles/views/Pictures/rc3.png";
// @ts-ignore
import cardIcon4 from "styles/views/Pictures/rc4.png";
// @ts-ignore
import cardIcon5 from "styles/views/Pictures/rc5.png";
// @ts-ignore
import cardIcon6 from "styles/views/Pictures/rc6.png";
// @ts-ignore
import cardIcon7 from "styles/views/Pictures/rc7.png";
// @ts-ignore
import cardIcon8 from "styles/views/Pictures/rc8.png";
// @ts-ignore
import cardIcon9 from "styles/views/Pictures/rc9.png";


import { api, handleError } from "helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import ModalWin from "../ui/ModalWin";
import LoseModal from "../ui/LoseModal";
import AdjDict from '../../models/AdjDict.js';
import AttackModal from "../ui/AttackModal";
import LeaveModal from "../ui/LeaveModal";
import RiskCardModal from "../ui/RiskCardModal";
import Game from "models/Game";
import ApiStyles from "helpers/avatarApiStyles";
import Countdown from "../ui/Countdown";
import Announcer from "../ui/Announcer";

const TitleScreen: React.FC = () => {
    const [game, setGame] = useState<Game>(null);
    const [phase, setPhase] = useState(null);
    const [currentPlayerId, setCurrentPlayerId] = useState(null);
    const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
    const [currentTroopBonus, setCurrentTroopBonus] = useState(null);
    const [selectedTroops, setSelectedTroops] = useState(1);
    const [isPlacing, setIsPlacing] = useState(false);
    const [cardBonus, setCardBonus] = useState(null);
    const [isMidTurn, setIsMidTurn] = useState(false);

    const buttonRefs = React.useRef<{ [key: string]: HTMLButtonElement }>({});
    const navigate = useNavigate();
    const styles = new ApiStyles;
    let [num, setNum] = useState(0);

    const CasualAvatar = "https://api.dicebear.com/8.x/shapes/svg?seed=Mittens";
    const [AllIDwithAvatar, setAllIDwithAvatar] = useState({});

    const { gameId } = useParams()
    const lobbyId = localStorage.getItem("lobbyId")
    const [startButton, setStartButton] = useState<string | null>(null);
    const adjDict = new AdjDict();
    const [additionalTime, setAdditionalTime] = useState(0);
//reload idea

    const [curx, setX] = useState(0);
    const [cury, setY] = useState(0);
    const [curwidth, setCurWidth] = useState(0);
    const [curheight, setCurHeight] = useState(0);

    const [PlayerColor, setPlayerColor] = useState({});
    const colors = ["red", "blue", "purple", "green", "orange", "brown"];
    const [PlayerCycle, setPlayerCycle] = useState(null);
    const [highlighted, setHighlighted] = useState([]);
    const [curListOfValidReinforcements, setcurListOfValidReinforcements] = useState([]);
    const [CurrentHighlightedButtons, setCurrentHighlightedButtons] = useState(null);
    const NameCycle = ["Go to Attack", "Go to Troop Movement", "End The Turn"];
    const [CurrentText, setCurrentText] = useState("Go To Attack");
    const [isWinModalOpen, setIsWinModalOpen] = useState(false);
    const [isLoseModalOpen, setIsLoseModalOpen] = useState(false)
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)
    const [WinLoseWasShown, setWinLoseWasShown] = useState(false)
    const [StartTimer, setStartTimer] = useState(0);
    const [LoseList, setLoseList] = useState([]);
    const [CyclewithTroopsandTerritories, setCyclewithTroopsandTerritories] = useState({});

//ALL imagens
    const defeat = new Image();
    defeat.src = defeatIcon;
    const arrow = new Image();
    arrow.src = currentPlayerArrow;
    const BonusIcon = new Image();
    BonusIcon.src = bonusIcon;
    const TroopIcon = new Image();
    TroopIcon.src = troopsIcon;
    const TerritoryIcon = new Image();
    TerritoryIcon.src = territoryIcon;

    const CardIcon0 = new Image();
    CardIcon0.src = cardIcon0;
    const CardIcon1 = new Image();
    CardIcon1.src = cardIcon1;
    const CardIcon2 = new Image();
    CardIcon2.src = cardIcon2;
    const CardIcon3 = new Image();
    CardIcon3.src = cardIcon3;
    const CardIcon4 = new Image();
    CardIcon4.src = cardIcon4;
    const CardIcon5 = new Image();
    CardIcon5.src = cardIcon5;
    const CardIcon6 = new Image();
    CardIcon6.src = cardIcon6;
    const CardIcon7 = new Image();
    CardIcon7.src = cardIcon7;
    const CardIcon8 = new Image();
    CardIcon8.src = cardIcon8;
    const CardIcon9 = new Image();
    CardIcon9.src = cardIcon9;








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
        setIsLeaveModalOpen(false);
        setIsWinModalOpen(false);
        undoLine();
    };

    useEffect(() => {
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

            if(updatedGame.data.turnCycle.currentPhase === "ATTACK"){
                setCardBonus(updatedGame.data.turnCycle.currentPlayer.cardBonus);
            }
            else {
                let troops = currentTroopBonus;
                setCurrentTroopBonus(troops + updatedGame.data.turnCycle.currentPlayer.cardBonus);
            }
            setIsPlacing(true);
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
        {id: 'Alaska', refKey: 'Alaska', text: 'Alaska', xratio: 0.08, yratio: 0.14, troops: 0, owner: 0, color: 0},
        {id: 'Northwest Territory', refKey: 'Northwest Territory', text: 'Northwest Territory', xratio: 0.18, yratio: 0.145, troops: 0, owner: 0, color: 0},
        {id: 'Greenland', refKey: 'Greenland', text: 'Greenland', xratio: 0.35, yratio: 0.1, troops: 0, owner: 0, color: 0},
        {id: 'Quebec', refKey: 'Quebec', text: 'Quebec', xratio: 0.3, yratio: 0.24, troops: 0, owner: 0, color: 0},
        {id: 'Ontario', refKey: 'Ontario', text: 'Ontario', xratio: 0.23, yratio: 0.24, troops: 0, owner: 0, color: 0},
        {id: 'Alberta', refKey: 'Alberta', text: 'Alberta', xratio: 0.16, yratio: 0.23, troops: 0, owner: 0, color: 0},
        {id: 'Western US', refKey: 'Western US', text: 'Western US', xratio: 0.18, yratio: 0.335, troops: 0, owner: 0, color: 0},
        {id: 'Eastern US', refKey: 'Eastern US', text: 'Eastern US', xratio: 0.24, yratio: 0.37, troops: 0, owner: 0, color: 0},
        {id: 'Central America', refKey: 'Central America', text: 'Central America', xratio: 0.185, yratio: 0.455, troops: 0, owner: 0, color: 0},
        {id: 'Venezuela', refKey: 'Venezuela', text: 'Venezuela', xratio: 0.26, yratio: 0.55, troops: 0, owner: 0, color: 0},
        {id: 'Brazil', refKey: 'Brazil', text: 'Brazil', xratio: 0.31, yratio: 0.63, troops: 0, owner: 0, color: 0},
        {id: 'Peru', refKey: 'Peru', text: 'Peru', xratio: 0.27, yratio: 0.676, troops: 0, owner: 0, color: 0},
        {id: 'Argentina', refKey: 'Argentina', text: 'Argentina', xratio: 0.28, yratio: 0.79, troops: 0, owner: 0, color: 0},
        {id: 'Ukraine', refKey: 'Ukraine', text: 'Ukraine', xratio: 0.582, yratio: 0.275, troops: 0, owner: 0, color: 0},
        {id: 'Northern Europe', refKey: 'Northern Europe', text: 'Northern Europe', xratio: 0.50, yratio: 0.33, troops: 0, owner: 0, color: 0},
        {id: 'Southern Europe', refKey: 'Southern Europe', text: 'Southern Europe', xratio: 0.51, yratio: 0.425, troops: 0, owner: 0, color: 0},
        {id: 'Iceland', refKey: 'Iceland', text: 'Iceland', xratio: 0.435, yratio: 0.2, troops: 0, owner: 0, color: 0},
        {id: 'Western Europe', refKey: 'Western Europe', text: 'Western Europe', xratio: 0.43, yratio: 0.47, troops: 0, owner: 0, color: 0},
        {id: 'Scandinavia', refKey: 'Scandinavia', text: 'Scandinavia', xratio: 0.505, yratio: 0.19, troops: 0, owner: 0, color: 0},
        {id: 'Great Britain', refKey: 'Great Britain', text: 'Great Britain', xratio: 0.42, yratio: 0.315, troops: 0, owner: 0, color: 0},
        {id: 'Egypt', refKey: 'Egypt', text: 'Egypt', xratio: 0.54, yratio: 0.565, troops: 0, owner: 0, color: 0},
        {id: 'East Africa', refKey: 'East Africa', text: 'East Africa', xratio: 0.58, yratio: 0.656, troops: 0, owner: 0, color: 0},
        {id: 'Congo', refKey: 'Congo', text: 'Congo', xratio: 0.54, yratio: 0.72, troops: 0, owner: 0, color: 0},
        {id: 'South Africa', refKey: 'South Africa', text: 'South Africa', xratio: 0.55, yratio: 0.84, troops: 0, owner: 0, color: 0},
        {id: 'North Africa', refKey: 'North Africa', text: 'North Africa', xratio: 0.48, yratio: 0.6, troops: 0, owner: 0, color: 0},
        {id: 'Madagascar', refKey: 'Madagascar', text: 'Madagascar', xratio: 0.627, yratio: 0.84, troops: 0, owner: 0, color: 0},
        {id: 'Indonesia', refKey: 'Indonesia', text: 'Indonesia', xratio: 0.805, yratio: 0.71, troops: 0, owner: 0, color: 0},
        {id: 'New Guinea', refKey: 'New Guinea', text: 'New Guinea', xratio: 0.884, yratio: 0.68, troops: 0, owner: 0, color: 0},
        {id: 'Western Australia', refKey: 'Western Australia', text: 'Western Australia', xratio: 0.84, yratio: 0.85, troops: 0, owner: 0, color: 0},
        {id: 'Eastern Australia', refKey: 'Eastern Australia', text: 'Eastern Australia', xratio: 0.915, yratio: 0.82, troops: 0, owner: 0, color: 0},
        {id: 'Ural', refKey: 'Ural', text: 'Ural', xratio: 0.685, yratio: 0.25, troops: 0, owner: 0, color: 0},
        {id: 'Siberia', refKey: 'Siberia', text: 'Siberia', xratio: 0.735, yratio: 0.16, troops: 0, owner: 0, color: 0},
        {id: 'Yakutsk', refKey: 'Yakutsk', text: 'Yakutsk', xratio: 0.805, yratio: 0.12, troops: 0, owner: 0, color: 0},
        {id: 'Irkutsk', refKey: 'Irkutsk', text: 'Irkutsk', xratio: 0.792, yratio: 0.25, troops: 0, owner: 0, color: 0},
        {id: 'Kamchatka', refKey: 'Kamchatka', text: 'Kamchatka', xratio: 0.88, yratio: 0.13, troops: 0, owner: 0, color: 0},
        {id: 'Japan', refKey: 'Japan', text: 'Japan', xratio: 0.895, yratio: 0.35, troops: 0, owner: 0, color: 0},
        {id: 'Mongolia', refKey: 'Mongolia', text: 'Mongolia', xratio: 0.805, yratio: 0.345, troops: 0, owner: 0, color: 0},
        {id: 'China', refKey: 'China', text: 'China', xratio: 0.76, yratio: 0.42, troops: 0, owner: 0, color: 0},
        {id: 'Afghanistan', refKey: 'Afghanistan', text: 'Afghanistan', xratio: 0.665, yratio: 0.36, troops: 0, owner: 0, color: 0},
        {id: 'Middle East', refKey: 'Middle East', text: 'Middle East', xratio: 0.61, yratio: 0.535, troops: 0, owner: 0, color: 0},
        {id: 'India', refKey: 'India', text: 'India', xratio: 0.715, yratio: 0.51, troops: 0, owner: 0, color: 0},
        {id: 'Siam', refKey: 'Siam', text: 'Siam', xratio: 0.785, yratio: 0.55, troops: 0, owner: 0, color: 0},
    ]);


    const config = {Authorization: localStorage.getItem("lobbyToken")};

    useEffect(() => {
        if (game?.turnCycle?.currentPhase === null || game !== null || game?.turnCycle?.currentPlayer === null) {
            showLoadingScreen();
        } else {
            hideLoadingScreen();
        }
        // Define the function to fetch game data
        async function getGame() {
            try {
                if(game === null){
                    pause(2000);
                }
                const gameResponse = await api.get(`/lobbies/${lobbyId}/game/${gameId}`, {headers: config});
                setGame(gameResponse.data);
                setPhase(gameResponse.data.turnCycle.currentPhase); //ERROR adn CurrentPlayer


                setCurrentPlayerId(gameResponse.data.turnCycle.currentPlayer.playerId);
                setCurrentTroopBonus(gameResponse.data.turnCycle.currentPlayer.troopBonus);
                setCardBonus(gameResponse.data.turnCycle.currentPlayer.cardBonus);
                setPlayerCycle(gameResponse.data.turnCycle.playerCycle);

                if(game !== null && gameResponse.data.turnCycle.currentPlayer.playerId === localStorage.getItem("user_id")){
                    setIsCurrentPlayer(true);
                }
                else {
                    setIsCurrentPlayer(false);
                }

            } catch (error) {
                console.error("Error fetching game data:", error);
                if(error.message === "Request failed with status code 404" && localStorage.getItem("GameHasWinner") === "true") {
                    //console.log('Before Pause');
                    //pause(10000)
                    //.then(() => {
                    //console.log('After 10 seconds');
                    localStorage.removeItem("lobbyToken");
                    localStorage.removeItem("lobbyId");
                    localStorage.removeItem("WinLooseScreenWasShown");
                    localStorage.removeItem("GameHasWinner");
                    navigate("/lobby");
                //});

                }
                // Handle error if needed
                //if(game)
            }
        }

        // Call getGame initially
        getGame();

        // Set up the interval to call getGame every 2 seconds
        const intervalId = setInterval(() => {
            if (game !== null) {
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
            // CurrentPlayer == null
            if (phase === "REINFORCEMENT" && game.turnCycle.currentPlayer.riskCards.length >= 5 && parseInt(localStorage.getItem("user_id")) === game.turnCycle.currentPlayer.playerId){
                openCardModal();
            }
            else if (phase === "ATTACK" && game.turnCycle.currentPlayer.riskCards.length > 5 && parseInt(localStorage.getItem("user_id")) === game.turnCycle.currentPlayer.playerId){
                openCardModal();
                setIsMidTurn(true);
            }

            if (currentPlayerId !== null) {
                setCurrentPlayerId(currentPlayerId);
            }

            if (parseInt(localStorage.getItem("user_id")) === game.turnCycle.currentPlayer.playerId) {
                highlightCurrentButtons();
            }

            if (CyclewithTroopsandTerritories !== null) {
            }

            let PlayerwithColors = {};
            let x = 0;
            if (game !== null) {
                for (const player of game.players) {
                    PlayerwithColors[player.playerId] = colors[x];
                    x++;
                }
            }
            setPlayerColor(PlayerwithColors);
            let buttonDatacopy = [...buttonData]; // Create a shallow copy of buttonData

            for (let i = 0; i < buttonDatacopy.length; i++) {
                const button = buttonDatacopy[i];
                const territory1 = game.board.territories.find(territory => territory.name === buttonDatacopy[i].id);
                const playercolor = PlayerColor[territory1.owner]
                if(button.owner === 0){
                    button.troops = territory1.troops;
                    button.owner = territory1.owner;
                }
                else if (game !== null && territory1.troops !== button.troops || button.owner !== territory1.owner) {
                    if(button.owner !== territory1.owner){
                        button.troops = territory1.troops;
                        button.owner = territory1.owner;
                        showchangeofowner(button.id, "5px solid #8B0000");
                    } else {
                        if(button.troops < territory1.troops){
                            button.troops = territory1.troops;
                            button.owner = territory1.owner;
                            showchangeoftroops(button.id, "5px solid lightgreen");
                        } else {
                            button.troops = territory1.troops;
                            button.owner = territory1.owner;
                            showchangeoftroops(button.id, "5px solid #FF7F7F");
                        }
                    }

                } else {

                }
            }

            setButtonData(buttonDatacopy); // Update the state with the modified copy
            if (phase === "REINFORCEMENT") {
                setCurrentText(NameCycle[0]);
            } else if (phase === "ATTACK") {
                setCurrentText(NameCycle[1]);
            } else if (phase === "MOVE") {
                setCurrentText(NameCycle[2]);
                if (moved) {
                    nextState();
                }
            }

            const sC = sideContent;

            setStartTimer(prevState => prevState + 1);
            checkifyouHaveLostOrWon();
            setdeathsymbol()
        }


    }, [game, phase, currentPlayerId]);

    useEffect(() => {
    }, [isPlacing]);

    async function showchangeoftroops(buttonid, newcolor) {
        if (game.turnCycle.currentPlayer.playerId !== parseInt(localStorage.getItem("user_id")) || game.turnCycle.currentPhase === "REINFORCEMENT") {
        const avatar0Button = document.getElementById(buttonid);
        if (!avatar0Button) {
            console.error(`Button with id ${buttonid} not found`);
            return;
        }
        const originalColor = avatar0Button.style.border;
        avatar0Button.style.outline = newcolor;

        await pause(2000);

        avatar0Button.style.outline = "";
        }
    }

    async function showchangeofowner(buttonid, newcolor) {
        if (game.turnCycle.currentPlayer.playerId !== parseInt(localStorage.getItem("user_id"))) {
            const avatar0Button = document.getElementById(buttonid);
            if (!avatar0Button) {
                console.error(`Button with id ${buttonid} not found`);
                return;
            }
            const originalColor = avatar0Button.style.border;
            avatar0Button.style.outline = newcolor;

            await pause(2000);

            avatar0Button.style.outline = "";
        }
    }

    function pause(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const getButtonRatiosById = (id) => {
        const button = buttonData.find(button => button.id === id);
        return button ? {xratio: button.xratio, yratio: button.yratio} : {xratio: 0, yratio: 0}; // Return xratio and yratio if the button is found, otherwise return default values
    };

    const checkifyouHaveLostOrWon = () => {
        let won = true;
        let loose = true;
        if(game !== null) {
            if(game.turnCycle.playerCycle.length === 1){
                localStorage.setItem("GameHasWinner", "true");
            }
            let dic = setupdictionayforStats();
            for (const x of game.board.territories) {
                dic = addtroopsandterritories(dic, x);
                if (x.owner !== parseInt(localStorage.getItem("user_id"))) {
                    won = false;
                } else if (x.owner === parseInt(localStorage.getItem("user_id"))) {
                    loose = false
                }
            }
            setCyclewithTroopsandTerritories(dic);
            if (won === true && localStorage.getItem("WinLooseScreenWasShown") === "false") {
                WinScreen();
                localStorage.setItem("WinLooseScreenWasShown", "true");
                nextState();

            } else if (loose === true && localStorage.getItem("WinLooseScreenWasShown") === "false") {
                LooseScreen();
                localStorage.setItem("WinLooseScreenWasShown", "true");
                setWinLoseWasShown(true);
            }
        }
    };

    const setdeathsymbol = () => {
        if(game !== null) {
            if (PlayerCycle !== null) {
                let count = -1;
                for (const x of game.players) {
                    count++;
                    let bool = false;
                    for (const y of game.turnCycle.playerCycle) {
                        if(x.playerId === y.playerId){
                            bool = true;
                            break;
                        }
                    }
                    if (bool === false && !LoseList.includes(x.playerId)) {
                        setLoseList(prevList => {
                            // Create a new list by spreading the previous list
                            const newList = [...prevList];
                            if (!newList.includes(x.playerId)) {
                                newList.push(x.playerId);
                            }
                            console.log("I AM HERE BEFORE !!!!!!!! : ", newList + "count: " + count + "playerid: " + x.playerId);
                            return newList;
                        });
                        console.log("I AM HERE!!!!!!!! : ", LoseList);
                        for(const x of LoseList){
                            console.log(x);
                        }

                    }
                }
            }
        }
    };

    // Use useEffect to log the updated LoseList
    useEffect(() => {
        console.log("LoseList has been updated:", LoseList);
        for (const x of LoseList) {
            console.log(x);
            console.log(game);
            let count1 = -1;
            for (const y of game.players) {
                count1 = count1+1;
                if(x === y.playerId){
                    console.log("After Listupdate count: " + count1 + "playerid: " + x + " y: ", y.playerId);
                    const avatar0Button = document.getElementById(`avatar${count1}`);
                    console.log(avatar0Button);

                    if(game.players.length < 4){
                        defeat.classList.add('avatar-overlay3');}
                    if(game.players.length === 4){
                        defeat.classList.add('avatar-overlay4');}
                    if(game.players.length === 5){
                        defeat.classList.add('avatar-overlay5');}
                    if(game.players.length === 6){
                        defeat.classList.add('avatar-overlay6');}

// Append the image element to the avatar button
                    avatar0Button.appendChild(defeat);
                }
            }
        }
    }, [LoseList]);

    function showLoadingScreen() {
// Create a loading screen element
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        loadingScreen.innerHTML = 'Loading...'; // You can customize the loading text here

        // Add styles to the loading screen
        loadingScreen.style.position = 'fixed';
        loadingScreen.style.top = '0';
        loadingScreen.style.left = '0';
        loadingScreen.style.width = '100%';
        loadingScreen.style.height = '100%';
        loadingScreen.style.backgroundColor = 'black'; // Set background color to black
        loadingScreen.style.color = '#fff';
        loadingScreen.style.display = 'flex';
        loadingScreen.style.justifyContent = 'center';
        loadingScreen.style.alignItems = 'center';
        loadingScreen.style.zIndex = '9999';


// Append the loading screen to the body
        document.body.appendChild(loadingScreen);
    };

    function hideLoadingScreen() {
// Find and remove the loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.parentNode.removeChild(loadingScreen);
        }
    };

    const setupdictionayforStats = () => {
        let dic = {};
        let x = 0;
        for (const y of game.players) {
            dic[x] = [y.playerId, 0, 0];
            x++;
        }
        return dic;
    };

    const addtroopsandterritories = (dic, territory) => {
        let x = -1;
        for (const y of game.players) {
            x++;
            if (territory.owner === y.playerId) {
                dic[x][1] += 1;
                dic[x][2] += territory.troops;
            }
        }
        return dic;
    };

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
    };

    const highlightCurrentButtons = () => {
        const playerid = currentPlayerId;
        let validbuttonid = [];

        if (game) {

            for (let ter of game.board.territories) {
                if (ter.owner === playerid) {
                    if (phase === "REINFORCEMENT") {
                        validbuttonid.push(ter.name);
                    }
                    else if ((ter.troops > 1 && phase === "ATTACK" && checkifthereareenemies(ter.name)) || (phase === "ATTACK" && cardBonus && cardBonus !== 0)) {
                        validbuttonid.push(ter.name);
                    }
                    else if(phase === "MOVE" && ter.troops > 1 && checkifthereareneighbors(ter.name)){
                        validbuttonid.push(ter.name);
                    }
                }
            }
        
            setHighlighted(validbuttonid);
            if (CurrentHighlightedButtons !== null && CurrentHighlightedButtons !== undefined) {
                // Ensure validbuttonid is not null or undefined
                let x = [...CurrentHighlightedButtons];
                setCurrentHighlightedButtons([...x, validbuttonid]);
            } else {
            setCurrentHighlightedButtons(validbuttonid);}
    
            for (const button of validbuttonid) {
                const curbutton = buttonRefs.current[button]
                curbutton.style.border = "2px solid white";
            }
        }
    };

    const checkifthereareenemies = (id: string) => {
        for (const thisterritory of adjDict.dict[id]) {
            const curterritory = game.board.territories.find(territory => territory.name === thisterritory);
            if (curterritory.owner !== currentPlayerId) {
                return true;
            }
        }
        return false;
    };

    const checkifthereareneighbors = (id: string) => {
        for (const thisterritory of adjDict.dict[id]) {
            const curterritory = game.board.territories.find(territory => territory.name === thisterritory);
            if (curterritory.owner === currentPlayerId) {
                return true;
            }
        }
        return false;
    };

    const handleButtonClick = (id: string) => {
        const territory = game.board.territories.find(territory => territory.name === id);
        if (phase === "REINFORCEMENT" || (phase === "ATTACK" && cardBonus && cardBonus !== 0)) {
            deploytroops(id);
        }
        else if (phase === "ATTACK") {
            attackTerritory(id);
        }
        else if (phase === "MOVE") {
            reinforceTroops(id);
        }
    };
    const deploytroops = (id: string) => {
        increaseTroops(id);
    };

    const attackTerritory = (id: string) => {
        const territory = game.board.territories.find(territory => territory.name === id);
        if (startButton) {
            if (territory.owner !== currentPlayerId && adjDict.dict[startButton].includes(id)) {
                dehighlightadjbutton(startButton);
                dehighlightvalidbuttons();
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
                highlightCurrentButtons();
            } else{
                if(territory.owner === currentPlayerId && checkifthereareenemies(id) && territory.troops > 1){
                    dehighlightadjbutton(startButton);
                    setStartButton(id);
                    highlightadjbutton(id);
                }
            }
        } else {
            if(territory.owner === currentPlayerId && checkifthereareenemies(id) && territory.troops > 1){
                setStartButton(id);
                dehighlightvalidbuttons();
                highlightadjbutton(id);
            }}
    };

    const reinforceTroops = (id: string) => {
        redirectTroops(id)
    };

    const nextState = async () => {

        if (phase === "MOVE") {
            setStartButton(null);
            if (startButton) {
                dehighlightadjbutton(startButton);
            }
            undoLine();
            setCurrentTroopBonus(game.turnCycle.currentPlayer.troopBonus);
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

        dehighlightvalidbuttons();
        setMoved(false);
        setGame(updateGame.data);
        setPhase(updateGame.data.turnCycle.currentPhase);
        setCurrentPlayerId(updateGame.data.turnCycle.currentPlayer.playerId);
        setCurrentTroopBonus(updateGame.data.turnCycle.currentPlayer.troopBonus);
        setCardBonus(updateGame.data.turnCycle.currentPlayer.cardBonus);
    };

    const increaseTroops = (territory_id: string) => {
        const territory = game.board.territories.find(territory => territory.name === territory_id);
        const button = buttonData.find(button => button.id === territory_id); // Find the button data for the startId

        if (button && currentTroopBonus !== 0 &&  territory.owner === currentPlayerId && phase === "REINFORCEMENT") {
            if ((currentTroopBonus - selectedTroops) > 0) {
                territory.troops = territory.troops + parseInt(selectedTroops);
            }
            else {
                territory.troops = territory.troops + parseInt(currentTroopBonus);
            }
            button.troops = territory.troops; // set troop count to server troop count

            let troops = currentTroopBonus;
            if ((troops - selectedTroops) > 0) {
                setCurrentTroopBonus(troops - selectedTroops);
            }
            else {
                setCurrentTroopBonus(0);
                dehighlightvalidbuttons();
            }

            setButtonData([...buttonData]); // Update the button data array in the state
            setGame(game);
        }
        else if (button && currentTroopBonus !== 0 &&  territory.owner === currentPlayerId && phase === "ATTACK"){
            if ((cardBonus - selectedTroops) > 0) {
                territory.troops = territory.troops + parseInt(selectedTroops);
                setCardBonus(territory.troops - selectedTroops);
            }
            else {
                territory.troops = territory.troops + parseInt(cardBonus);
                setCardBonus(0);
                setIsMidTurn(false);
            }
            button.troops = territory.troops; // set troop count to server troop count

            let troops = cardBonus;
            if ((troops - selectedTroops) > 0) {
                setCardBonus(troops - selectedTroops);
            }
            else {
                setCardBonus(0);
                dehighlightvalidbuttons();
                setIsMidTurn(false);
            }

            setButtonData([...buttonData]); // Update the button data array in the state
            setGame(game);
        }

    };

    const redirectTroops = (id: string) => {
        const territory = game.board.territories.find(territory => territory.name === id);
        if (startButton) {
            if (currentPlayerId === territory.owner && CurrentHighlightedButtons.includes(id) && id !== startButton) {
                dehighlightadjbutton(startButton);
                dehighlightvalidbuttons();
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
                highlightCurrentButtons();
            }
        } else if (currentPlayerId === territory.owner && checkifthereareneighbors(id) && territory.troops > 1 && !moved) {
            dehighlightvalidbuttons();
            setStartButton(id);
            checkForAllValidReinforcements(id);
        }
    };

    const highlightadjbutton = (startId: string) => {
        //increaseTroops(startId);
        if (phase === "ATTACK") {
            const start = buttonRefs.current[startId];
            start.style.border = "2px double white";
            start.style.padding = "5px"; // Example padding

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
        }
    };


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

    };

    const dehighlightvalidbuttons = () => {
        console.log(game);
        for (const territory of game.board.territories) {
            const button = buttonRefs.current[territory.name]
            button.style.border = "2px solid black";
        }
    };

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

    const avatarStyleSide: React.CSSProperties = {
        width: '20px', // Adjust the size of the circle
        height: '20px', // Adjust the size of the circle
        borderRadius: '50%', // Makes the image circular
        overflow: 'hidden', // Hides the overflow
        marginRight: '5px', // Adjust the space between image
        marginLeft: '5px', // Adjust the space between images
        textAlign: 'center',
        //cursor: 'pointer'
    };

    const avatarStylePlayingSide: React.CSSProperties = {
        width: '75px', // Adjust the size of the circle
        height: '75px', // Adjust the size of the circle
        borderRadius: '50%', // Makes the image circular
        overflow: 'hidden', // Hides the overflow
        marginRight: '5px', // Adjust the space between images
        marginLeft: '5px', // Adjust the space between images
        border: '4px solid black', // Red outline
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
        if(game === null){
            showLoadingScreen();
        }else{
            hideLoadingScreen();
        }
        try {
            const config = {Authorization: localStorage.getItem("lobbyToken")};
            // get lobby info
            const getLobbyResponse = await api.get(`/lobbies/${lobbyId}`, {headers: config});
            const lobbyData = getLobbyResponse.data;

            // set the userIdList to an array of longs consisting of all the user IDs in the lobby
            let userIdList = lobbyData.players;

            let playeridwithavatar = {};
            const config1 = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id")};

            if (game !== null) {
                for (const playerid of game.players) {
                    playeridwithavatar[playerid.playerId] = null;
                }

                for (const player of userIdList) {
                    const playerresponse = await api.get("/users/" + player, {headers: config1});
                    playeridwithavatar[playerresponse.data.id] = `https://api.dicebear.com/8.x/thumbs/svg?seed=${styles.styles[playerresponse.data.avatarId]}`;
                }
                setAllIDwithAvatar(playeridwithavatar);
            }

        } catch (error) {
            alert(`Something went wrong with fetching the user data: \n${handleError(error)}`);
        }
    };
    const nextSate = document.getElementById('nextState');

    const LeavePlayer = async () => {
        let bool = false;
        for(const x of game.turnCycle.playerCycle){
            if (x.playerId === parseInt(localStorage.getItem("user_id"), 10)){
                bool = true;
            }
        }
        const config1 = {Authorization: localStorage.getItem("lobbyToken")};
        const userId = localStorage.getItem("user_id");

        if(bool){
            const gameResponse = await api.put(`lobbies/${lobbyId}/game/${gameId}/user/${userId}`, {},  {headers: config1});
            localStorage.removeItem("lobbyToken");
            localStorage.removeItem("lobbyId");
            localStorage.removeItem("WinLooseScreenWasShown");
            localStorage.removeItem("GameHasWinner");
            navigate("/lobby");
        } else {
            localStorage.removeItem("lobbyToken");
            localStorage.removeItem("lobbyId");
            localStorage.removeItem("WinLooseScreenWasShown");
            localStorage.removeItem("GameHasWinner");
            navigate("/lobby");
        }
    }

    function LeavePlayerConfirmation() {
        // Create a leave confirmation modal
        const leaveModal = document.createElement('div');
        leaveModal.id = 'leave-modal';
        leaveModal.innerHTML = `
        <div className="gamescreen-container">
            <h1 style="display: block; margin-top: 0px;">Do you really want to leave this game?</h1>
            <div class="button-container">
                <button id="leave-yes">Yes</button>
                <button id="leave-no">No</button>
            </div>
        </div>
    `;

        // Add styles to the modal
        leaveModal.style.position = 'fixed';
        leaveModal.style.top = '0';
        leaveModal.style.left = '0';
        //leaveModal.style.transform = 'translate(-50%, -50%)';
        leaveModal.style.backgroundColor = 'rgba(0, 0, 0, 0.90)'; // Darker and transparent black
        leaveModal.style.padding = '20px';
        leaveModal.style.zIndex = '1000';
        leaveModal.style.textAlign = 'center';
        leaveModal.style.width = '100%';
        leaveModal.style.height = '100%';
        leaveModal.style.color = '#fff';
        leaveModal.style.display = 'flex';
        leaveModal.style.justifyContent = 'center';
        leaveModal.style.alignItems = 'center';


        // Style the buttons
        const leaveYesBtn = leaveModal.querySelector('#leave-yes') as HTMLButtonElement;
        const leaveNoBtn = leaveModal.querySelector('#leave-no') as HTMLButtonElement;
        leaveYesBtn.style.marginRight = '50px'; // Add some space between buttons
        leaveYesBtn.style.padding = '10px 50px'; // Adjust padding for better appearance
        leaveYesBtn.style.backgroundColor = '#d32f2f'; // Red color for "Yes" button
        leaveYesBtn.style.color = '#fff'; // White text color
        leaveYesBtn.style.border = 'none'; // Remove border
        leaveYesBtn.style.borderRadius = '5px'; // Add some border radius for rounded corners
        leaveYesBtn.style.cursor = 'pointer'; // Show pointer cursor on hover
        leaveYesBtn.style.display = 'flex';
        leaveYesBtn.style.justifyContent = 'center';
        leaveYesBtn.style.alignItems = 'center';

        leaveNoBtn.style.padding = '10px 50px'; // Adjust padding for better appearance
        leaveNoBtn.style.backgroundColor = '#2196f3'; // Blue color for "No" button
        leaveNoBtn.style.color = '#fff'; // White text color
        leaveNoBtn.style.border = 'none'; // Remove border
        leaveNoBtn.style.borderRadius = '5px'; // Add some border radius for rounded corners
        leaveNoBtn.style.cursor = 'pointer'; // Show pointer cursor on hover
        leaveNoBtn.style.display = 'flex';
        leaveNoBtn.style.justifyContent = 'center';
        leaveNoBtn.style.alignItems = 'center';
        // Add event listeners to the buttons
        leaveYesBtn.addEventListener('click', () => {
            // Perform leave action here
            // For now, just console log
            LeavePlayer();
            leaveModal.remove(); // Remove the modal after leaving
        });

        leaveNoBtn.addEventListener('click', () => {
            leaveModal.remove(); // Remove the modal if user chooses not to leave
        });

        // Append the modal to the body
        document.body.appendChild(leaveModal);

        // Style the button container if it exists
        const buttonContainer = leaveModal.querySelector('.button-container') as HTMLButtonElement;
        if (buttonContainer) {
            buttonContainer.style.marginTop = '50px'; // Add some space between text and buttons
            buttonContainer.style.marginLeft = '25%';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.alignItems = 'center'; // Center buttons horizontally
        }
    }


    function WinScreen() {
// Create a leave confirmation modal
        const leaveModal = document.createElement('div');
        leaveModal.id = 'leave-modal';
        leaveModal.innerHTML = `
        <div className="gamescreen-container">
            <h1 style="display: block; margin-top: -100px;">Congratulations! You have won this Game</h1>
            <h2 style="display: block; margin-top: 50px;">Do you want to leave the game or go back to the board? </h2>
            <div class="button-container">
                <button id="leave-yes">I want to leave</button>
                <button id="leave-no">I want to go back to the board</button>
            </div>
        </div>
    `;

        // Add styles to the modal
        leaveModal.style.position = 'fixed';
        leaveModal.style.top = '0';
        leaveModal.style.left = '0';
        //leaveModal.style.transform = 'translate(-50%, -50%)';
        leaveModal.style.backgroundColor = 'rgba(0, 0, 0, 0.90)'; // Darker and transparent black
        leaveModal.style.padding = '20px';
        leaveModal.style.zIndex = '100';
        leaveModal.style.textAlign = 'center';
        leaveModal.style.width = '100%';
        leaveModal.style.height = '100%';
        leaveModal.style.color = '#fff';
        leaveModal.style.display = 'flex';
        leaveModal.style.justifyContent = 'center';
        leaveModal.style.alignItems = 'center';


        // Style the buttons
        const leaveYesBtn = leaveModal.querySelector('#leave-yes') as HTMLButtonElement;
        const leaveNoBtn = leaveModal.querySelector('#leave-no') as HTMLButtonElement;
        leaveYesBtn.style.marginRight = '50px'; // Add some space between buttons
        leaveYesBtn.style.padding = '10px 20px'; // Adjust padding for better appearance
        leaveYesBtn.style.backgroundColor = '#d32f2f'; // Red color for "Yes" button
        leaveYesBtn.style.color = '#fff'; // White text color
        leaveYesBtn.style.border = 'none'; // Remove border
        leaveYesBtn.style.borderRadius = '5px'; // Add some border radius for rounded corners
        leaveYesBtn.style.cursor = 'pointer'; // Show pointer cursor on hover
        leaveYesBtn.style.display = 'flex';
        leaveYesBtn.style.justifyContent = 'center';
        leaveYesBtn.style.alignItems = 'center';

        leaveNoBtn.style.padding = '10px 20px'; // Adjust padding for better appearance
        leaveNoBtn.style.backgroundColor = '#2196f3'; // Blue color for "No" button
        leaveNoBtn.style.color = '#fff'; // White text color
        leaveNoBtn.style.border = 'none'; // Remove border
        leaveNoBtn.style.borderRadius = '5px'; // Add some border radius for rounded corners
        leaveNoBtn.style.cursor = 'pointer'; // Show pointer cursor on hover
        leaveNoBtn.style.display = 'flex';
        leaveNoBtn.style.justifyContent = 'center';
        leaveNoBtn.style.alignItems = 'center';
        // Add event listeners to the buttons
        leaveYesBtn.addEventListener('click', () => {
        // Perform leave action here
            // For now, just console log
            LeavePlayer();
            leaveModal.remove(); // Remove the modal after leaving
        });

        leaveNoBtn.addEventListener('click', () => {
            leaveModal.remove(); // Remove the modal if user chooses not to leave
        });

        // Append the modal to the body
        document.body.appendChild(leaveModal);

        // Style the button container if it exists
        const buttonContainer = leaveModal.querySelector('.button-container') as HTMLButtonElement;
        if (buttonContainer) {
            buttonContainer.style.marginTop = '50px'; // Add some space between text and buttons
            buttonContainer.style.marginLeft = '14%';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.alignItems = 'center'; // Center buttons horizontally
        }
    }

    function LooseScreen() {
        // Create a leave confirmation modal
        const leaveModal = document.createElement('div');
        leaveModal.id = 'leave-modal';
        leaveModal.innerHTML = `
        <div className="gamescreen-container">
            <h1 style="display: block; margin-top: -100px;">Too Bad! You have been defeated!</h1>
            <h2 style="display: block; margin-top: 50px;">Do you want to leave the game or continue to spectate the game? </h2>
            <div class="button-container">
                <button id="leave-yes">I want to leave</button>
                <button id="leave-no">I want to continue spectating</button>
            </div>
        </div>
    `;

        // Add styles to the modal
        leaveModal.style.position = 'fixed';
        leaveModal.style.top = '0';
        leaveModal.style.left = '0';
        //leaveModal.style.transform = 'translate(-50%, -50%)';
        leaveModal.style.backgroundColor = 'rgba(0, 0, 0, 0.90)'; // Darker and transparent black
        leaveModal.style.padding = '20px';
        leaveModal.style.zIndex = '100';
        leaveModal.style.textAlign = 'center';
        leaveModal.style.width = '100%';
        leaveModal.style.height = '100%';
        leaveModal.style.color = '#fff';
        leaveModal.style.display = 'flex';
        leaveModal.style.justifyContent = 'center';
        leaveModal.style.alignItems = 'center';


        // Style the buttons
        const leaveYesBtn = leaveModal.querySelector('#leave-yes') as HTMLButtonElement;
        const leaveNoBtn = leaveModal.querySelector('#leave-no') as HTMLButtonElement;
        leaveYesBtn.style.marginRight = '50px'; // Add some space between buttons
        leaveYesBtn.style.padding = '10px 20px'; // Adjust padding for better appearance
        leaveYesBtn.style.backgroundColor = '#d32f2f'; // Red color for "Yes" button
        leaveYesBtn.style.color = '#fff'; // White text color
        leaveYesBtn.style.border = 'none'; // Remove border
        leaveYesBtn.style.borderRadius = '5px'; // Add some border radius for rounded corners
        leaveYesBtn.style.cursor = 'pointer'; // Show pointer cursor on hover
        leaveYesBtn.style.display = 'flex';
        leaveYesBtn.style.justifyContent = 'center';
        leaveYesBtn.style.alignItems = 'center';

        leaveNoBtn.style.padding = '10px 20px'; // Adjust padding for better appearance
        leaveNoBtn.style.backgroundColor = '#2196f3'; // Blue color for "No" button
        leaveNoBtn.style.color = '#fff'; // White text color
        leaveNoBtn.style.border = 'none'; // Remove border
        leaveNoBtn.style.borderRadius = '5px'; // Add some border radius for rounded corners
        leaveNoBtn.style.cursor = 'pointer'; // Show pointer cursor on hover
        leaveNoBtn.style.display = 'flex';
        leaveNoBtn.style.justifyContent = 'center';
        leaveNoBtn.style.alignItems = 'center';
        // Add event listeners to the buttons
        leaveYesBtn.addEventListener('click', () => {
        // Perform leave action here
            // For now, just console log
            LeavePlayer();
            leaveModal.remove(); // Remove the modal after leaving
        });

        leaveNoBtn.addEventListener('click', () => {
            leaveModal.remove(); // Remove the modal if user chooses not to leave
        });

        // Append the modal to the body
        document.body.appendChild(leaveModal);

        // Style the button container if it exists
        const buttonContainer = leaveModal.querySelector('.button-container') as HTMLButtonElement;
        if (buttonContainer) {
            buttonContainer.style.marginTop = '50px'; // Add some space between text and buttons
            buttonContainer.style.marginLeft = '18%';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.alignItems = 'center'; // Center buttons horizontally
        }
    }


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
            if(game === null){
                pause(2000);
            }
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
                    (but as HTMLButtonElement).style.fontSize = `${buttonHeight * 0.3 * 2.5}px`;
                }

                allbuttons = document.querySelectorAll('.avatar');
                buttonsArray = Array.from(allbuttons); // Convert NodeList to Array
                for (const but of buttonsArray) {
                    if(game !== null && game.players.length < 4){
                        (but as HTMLButtonElement).style.height = `${buttonHeight * 3.5}px`;
                        (but as HTMLButtonElement).style.width = `${buttonWidth *3.5}px`;
                    }
                    if(game !== null && game.players.length === 4){
                        (but as HTMLButtonElement).style.height = `${buttonHeight * 3}px`;
                        (but as HTMLButtonElement).style.width = `${buttonWidth * 3}px`;
                    }
                    if(game !== null && game.players.length === 5){
                        (but as HTMLButtonElement).style.height = `${buttonHeight * 2.8}px`;
                        (but as HTMLButtonElement).style.width = `${buttonWidth * 2.8}px`;

                    }
                    if(game !== null && game.players.length === 6){
                        (but as HTMLButtonElement).style.height = `${buttonHeight * 2.5}px`;
                        (but as HTMLButtonElement).style.width = `${buttonWidth * 2.5}px`;
                    }
                }

                    allbuttons = document.querySelectorAll('.statspicture');
                    buttonsArray = Array.from(allbuttons); // Convert NodeList to Array
                    for (const but of buttonsArray) {
                        if(game !== null && game.players.length < 4){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 1}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 1}px`;
                            // (but as HTMLButtonElement).style.alignItems = `left`;
                            // (but as HTMLButtonElement).style.alignContent = `left`;
                            (but as HTMLButtonElement).style.textAlign = `left`;
                        }
                        if(game !== null && game.players.length === 4){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 1}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 1}px`;
                        }
                        if(game !== null && game.players.length === 5){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * .9}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * .9}px`;

                        }
                        if(game !== null && game.players.length === 6){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * .75}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * .75}px`;
                        }
                    }

                    allbuttons = document.querySelectorAll('.avatarfont');
                    buttonsArray = Array.from(allbuttons); // Convert NodeList to Array
                    for (const but of buttonsArray) {
                        if(game !== null && game.players.length < 4) {
                            (but as HTMLTitleElement).style.fontSize = `${buttonHeight * 0.6}px`;
                        }
                        if(game !== null && game.players.length === 4) {
                            (but as HTMLTitleElement).style.fontSize = `${buttonHeight * 0.6}px`;
                        }
                        if(game !== null && game.players.length === 5) {
                            (but as HTMLTitleElement).style.fontSize = `${buttonHeight * 0.55}px`;
                        }
                        if(game !== null && game.players.length === 6) {
                            (but as HTMLTitleElement).style.fontSize = `${buttonHeight * 0.48}px`;
                        }
                    }

                    allbuttons = document.querySelectorAll('.avatar-arrow');
                    buttonsArray = Array.from(allbuttons); // Convert NodeList to Array
                    for (const but of buttonsArray) {
                        if(game !== null && game.players.length < 4){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 2.5}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 2.5}px`;
                            // (but as HTMLButtonElement).style.alignItems = `left`;
                            // (but as HTMLButtonElement).style.alignContent = `left`;
                            (but as HTMLButtonElement).style.left = '100%';
                        }
                        if(game !== null && game.players.length === 4){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 2.5}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 2.5}px`;
                            (but as HTMLButtonElement).style.left = '100%';
                        }
                        if(game !== null && game.players.length === 5){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 2.5}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 2.5}px`;
                            (but as HTMLButtonElement).style.left = '100%';

                        }
                        if(game !== null && game.players.length === 6){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 2.5}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 2.5}px`;
                            (but as HTMLButtonElement).style.left = '100%';
                        }
                    }

                    allbuttons = document.querySelectorAll('.avatar-cards');
                    buttonsArray = Array.from(allbuttons); // Convert NodeList to Array
                    const totalWidth = document.documentElement.scrollWidth;
                    const totalHeight = document.documentElement.scrollHeight;
                    let crtratio = totalWidth/totalHeight;
                    let normalratio = 1.553;
                    let changetoleft = Math.abs(normalratio-crtratio);
                    for (const but of buttonsArray) {
                        if(game !== null && game.players.length < 4){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 1.7}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 1.7}px`;
                            (but as HTMLButtonElement).style.left = `${60+changetoleft*5}%`;
                            // (but as HTMLButtonElement).style.alignContent = `left`;

                        }
                        if(game !== null && game.players.length === 4){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 1.4}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 1.4}px`;
                            (but as HTMLButtonElement).style.left = `${60+changetoleft*5}%`;
                        }
                        if(game !== null && game.players.length === 5){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 1.4}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 1.4}px`;
                            (but as HTMLButtonElement).style.left = `${60+changetoleft*5}%`;

                        }
                        if(game !== null && game.players.length === 6){
                            (but as HTMLButtonElement).style.height = `${buttonHeight * 1.4}px`;
                            (but as HTMLButtonElement).style.width = `${buttonWidth * 1.4}px`;
                            (but as HTMLButtonElement).style.left = `${60+changetoleft*5}%`;
                        }
                    }
                    defeat.style.height = `${buttonHeight * 4}px`;
                    defeat.style.width = `${buttonWidth * 4}px`;
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
    }, [PlayerColor, game]);

    let renderButtons = null; // Initialize renderButtons as null initially

    if (game !== null) { // Only render buttons if game data is available
        renderButtons = (
          buttonData.map((button) => (
            <button
              key={button.id}
              id={button.id}
              ref={(buttonRef) => {
                  if (buttonRef) buttonRefs.current[button.refKey] = buttonRef;
              }}
              className="game-buttons"
              style={{}}
              onClick={() => handleButtonClick(button.id)}
              disabled={parseInt(currentPlayerId) !== parseInt(localStorage.getItem("user_id")) || localStorage.getItem("WinLooseScreenWasShown") === "true"}
            >
                {button.troops}
            </button>
          ))
        );
    }


    function getAvatarSrc(x: number) {
        if (game !== null && game.players !== null && game.players.length > x && AllIDwithAvatar.length !== 0) {
            return AllIDwithAvatar[game.players[x].playerId];
        } else {
            return null;
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
        if (game !== null && game.players !== null && PlayerCycle !== null && game.players.length > x && PlayerColor.length !== 0) {
            if (game.players[x].playerId === currentPlayerId) {
                return `6px double ${PlayerColor[game.players[x].playerId]}`;
            } else {
                return `4px solid ${PlayerColor[game.players[x].playerId]}`;
            }
        } else {
            return "2px solid transparent"; // Return empty string if x is out of bounds or PlayerCycle[x] is falsy
        }
    }

    const handleHover = (avatar: string) => {
        const avatarElement = document.getElementById(avatar);
        if (avatarElement) {
            avatarElement.style.transform = 'scale(1.2)'; // Increase the size by 20%
            avatarElement.style.cursor = 'pointer';
        }
    };

    const handleHoverOut = (avatar: string) => {
        const avatarElement = document.getElementById(avatar);
        if (avatarElement) {
            avatarElement.style.transform = 'scale(1)'; // Reset the size to normal
            avatarElement.style.cursor = 'default';
        }
    };
    //HUHHUHU
    const checkforheightoftexts = () => {
        if(game !== null && game.players.length < 4){
            return 10;
        }
        else if(game !== null && game.players.length === 4){
            return 3;
        }
        else if(game !== null && game.players.length === 5){
            return 5;
        }
        else if(game !== null && game.players.length === 6){
            return 10;
        } else {
            return 10;
        }
    };

    const UpdateIconSizes = () => {
        if(game !== null && game.players.length < 4){
            return { Iconwidth: 25, Iconheight: 25 };
        }
        else if(game !== null && game.players.length === 4){
            return { Iconwidth: 25, Iconheight: 25 };
        }
        else if(game !== null && game.players.length === 5){
            return { Iconwidth: 25, Iconheight: 25 };
        }
        else if(game !== null && game.players.length === 6){
            return { Iconwidth: 20, Iconheight: 20 };
        }
    };

    const UpdateCardSizes = () => {
        if(game !== null && game.players.length < 4){
            return { Cardwidth: 45, Cardheight: 45};
        }
        else if(game !== null && game.players.length === 4){
            return { Cardwidth: 40, Cardheight: 40};
        }
        else if(game !== null && game.players.length === 5){
            return { Cardwidth: 40, Cardheight: 40};
        }
        else if(game !== null && game.players.length === 6){
            return { Cardwidth: 30, Cardheight: 30};
        }
    };
    const GetCorrectCard = (player) => {
        if(game !== null && player.riskCards.length === 0){
            return CardIcon0.src;
        }
        else if(game !== null && player.riskCards.length === 1){
            return CardIcon1.src;
        }
        else if(game !== null && player.riskCards.length === 2){
            return CardIcon2.src;
        }
        else if(game !== null && player.riskCards.length === 3){
            return CardIcon3.src;
        }
        if(game !== null && player.riskCards.length === 4){
            return CardIcon4.src;
        }
        else if(game !== null && player.riskCards.length === 5){
            return CardIcon5.src;
        }
        else if(game !== null && player.riskCards.length === 6){
            return CardIcon6.src;
        }
        else if(game !== null && player.riskCards.length === 7){
            return CardIcon7.src;
        }
        else if(game !== null && player.riskCards.length === 8){
            return CardIcon8.src;
        }
        else if(game !== null && player.riskCards.length === 9){
            return CardIcon9.src;
        }
    };



    const generateAvatarElement = (index) => {
        const maxHeight = `${100 / 6}%`; // 6 is the number of avatars
        const player = game.players[index];
        const avatarSrc = getAvatarSrc(index);
        const troopBonuses = CyclewithTroopsandTerritories !== null ? CyclewithTroopsandTerritories[index] : undefined;
        const { Iconwidth, Iconheight } = UpdateIconSizes();
        const { Cardwidth, Cardheight} = UpdateCardSizes();
        const cardIcon = GetCorrectCard(player);

        return (
          <div key={`avatar-${index}`} style={{maxHeight: maxHeight}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{position: 'relative'}}>
                      {troopBonuses !== undefined && (
                          <div style={{ position: 'absolute', right: '100%', top: `${checkforheightoftexts()}%`, alignSelf: 'flex-start', alignText: "left", alignContent: "left" }}>
                              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                  <div style={{ display: 'flex', alignItems: 'left' }}>
                                      <img className="statspicture" src={TerritoryIcon.src} alt="icon" style={{
                                          marginRight: '0px', width: `${Iconwidth}px`, height: `${Iconheight}px`
                                      }} />
                                      <span className="avatarfont">{troopBonuses[1]}</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'left' }}>
                                      <img className="statspicture" src={TroopIcon.src} alt="icon" style={{
                                          marginRight: '0px', width: `${Iconwidth}px`, height: `${Iconheight}px`
                                      }} />
                                      <span className="avatarfont">{troopBonuses[2]}</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'left' }}>
                                      <img className="statspicture" src={BonusIcon.src} alt="icon" style={{
                                          marginRight: '0px', width: `${Iconwidth}px`, height: `${Iconheight}px`
                                      }} />
                                      <span className="avatarfont">{player.troopBonus > 0 && ("+" + player.troopBonus)}</span>
                                  </div>
                              </div>
                          </div>
                      )}


                      <div style={{position: 'relative'}}>
                          <div className="avatar" id={`avatar${index}`}
                               style={{...avatarStyleSide, border: `${getAvatarColor(index)}`}}>
                              <img
                                src={avatarSrc}
                                alt="avatar"
                                style={imageStyle}

                                onMouseEnter={() => {
                                    if (game !== null && player.playerId === parseInt(localStorage.getItem("user_id")) && localStorage.getItem("WinLooseScreenWasShown") === "false") {
                                        handleHover(`avatar${index}`);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (game !== null && player.playerId === parseInt(localStorage.getItem("user_id")) && localStorage.getItem("WinLooseScreenWasShown") === "false") {
                                        handleHoverOut(`avatar${index}`);
                                    }
                                }}
                                onClick={() => {
                                    if(localStorage.getItem("WinLooseScreenWasShown") === "false"){
                                    ((game && player.playerId === parseInt(localStorage.getItem("user_id"))) && openCardModal());
                                    console.log(`I Clicked this avatar${index}`);}
                                }}
                              />
                          </div>
                          {game !== null && game.turnCycle.currentPlayer.playerId === player.playerId && game.players.length <= 3 && (
                            <img className="avatar-arrow" src={arrow.src} alt="overlay" style={{
                                position: 'absolute',
                                right: '-73px',
                                top: '50%',
                                transform: 'translateY(-50%) rotate(180deg)',
                                width: '80px', // Adjust the width as needed
                                height: '80px' // Adjust the height as needed
                            }}/>
                          )}
                          {game !== null && game.turnCycle.currentPlayer.playerId === player.playerId && game.players.length === 4 && (
                            <img className="avatar-arrow" src={arrow.src} alt="overlay" style={{
                                position: 'absolute',
                                right: '-77px',
                                top: '50%',
                                transform: 'translateY(-50%) rotate(180deg)',
                                width: '80px', // Adjust the width as needed
                                height: '80px' // Adjust the height as needed
                            }}/>
                          )}
                          {game !== null && game.turnCycle.currentPlayer.playerId === player.playerId && game.players.length === 5 && (
                            <img className="avatar-arrow" src={arrow.src} alt="overlay" style={{
                                position: 'absolute',
                                right: '-77px',
                                top: '50%',
                                transform: 'translateY(-50%) rotate(180deg)',
                                width: '80px', // Adjust the width as needed
                                height: '80px' // Adjust the height as needed
                            }}/>
                          )}
                          {game !== null && (
                            <>
                                {game.turnCycle.currentPlayer.playerId === player.playerId && game.players.length === 6 && (
                                  <img className="avatar-arrow" src={arrow.src} alt="overlay" style={{
                                      position: 'absolute',
                                      right: '-60px',
                                      top: '50%',
                                      transform: 'translateY(-50%) rotate(180deg)',
                                      width: '70px', // Adjust the width as needed
                                      height: '70px' // Adjust the height as needed
                                  }}/>
                                )}
                                {game.players.length < 4 && (
                                  <img className="avatar-cards" src={cardIcon} alt="overlay" style={{
                                      position: 'absolute',
                                      top: '-5px',
                                      left: '50px',
                                      width: `${Cardwidth}px`, // Adjust the width as needed
                                      height: `${Cardheight}px`,
                                      zIndex: 2
                                  }}/>
                                )}
                                {game.players.length >= 4 && (
                                  <img className="avatar-cards" src={cardIcon} alt="overlay" style={{
                                      position: 'absolute',
                                      top: '0px',
                                      left: '50px',
                                      width: `${Cardwidth}px`, // Adjust the width as needed
                                      height: `${Cardheight}px`,
                                      zIndex: 2
                                  }}/>
                                )}
                            </>
                          )}

                      </div>
                  </div>
                  <div className="avatarfont" style={{textAlign: 'center'}}>{player.username}</div>
              </div>
          </div>
        );
    };

    const isButtonDisabled = parseInt(currentPlayerId) !== parseInt(localStorage.getItem("user_id")) ||
                           localStorage.getItem("WinLooseScreenWasShown") === "true" ||
                           (currentTroopBonus > 0 && phase === "REINFORCEMENT") || (phase === "ATTACK" && isMidTurn);

    let lowerContent = (<div className="gamescreen-innerlower-container">
        <div className="gamescreen-bottomleft-container">
            {(localStorage.getItem("WinLooseScreenWasShown") === "false") && (parseInt(currentPlayerId) === parseInt(localStorage.getItem("user_id"))) && (
                <>
                    <div className="gamescreen-phase-container">
                        <button
                            id="nextState"
                            className="dynbut gamescreen-buttons-container"
                            onClick={() => {
                                if (currentTroopBonus !== 0 && phase === "REINFORCEMENT") {
                                // Handle button click logic here
                                } else {
                                    const cur = nextState();
                                }
                            }}
                            disabled={isButtonDisabled}
                        >
                        {CurrentText}
                        </button>
                    </div>
                    <div className="gamescreen-troops-container">
                        {((currentTroopBonus !== 0 && phase === "REINFORCEMENT") || (phase === "ATTACK" && isMidTurn)) && (parseInt(currentPlayerId) === parseInt(localStorage.getItem("user_id"))) && (localStorage.getItem("WinLooseScreenWasShown") === "false") &&(

                            <div className="gamescreen-selection-split">
                                <div className="dynbut game-select-label">
                                    <button
                                        className={`game-select ${selectedTroops === 1 ? 'highlighted' : ''}`}
                                        onClick={() => setSelectedTroops(1)}
                                    >
                                        1
                                    </button>
                                    <button
                                        className={`game-select ${selectedTroops === 5 ? 'highlighted' : ''}`}
                                        onClick={() => setSelectedTroops(5)}
                                    >
                                        5
                                    </button>
                                    <button
                                        className={`game-select ${selectedTroops === 10 ? 'highlighted' : ''}`}
                                        onClick={() => setSelectedTroops(10)}
                                    >
                                        10
                                    </button>
                                </div>
                                <div
                                    id="nextState"
                                    className="dynbut gamescreen-buttons-container-troops"
                                    onClick={() => {
                                        //setCurrentTroopBonus(prevState => prevState + 100);
                                    }}
                                    disabled={!isCurrentPlayer || localStorage.getItem("WinLooseScreenWasShown") === "true"}
                                >
                                {"Troop Amount:" + ((phase === "REINFORCEMENT") ? currentTroopBonus : (isMidTurn && cardBonus))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
        <div className="gamescreen-bottomright-container">
            <div className="gamescreen-leave-container">
                <button
                id="nextState"
                className="dynbut gamescreen-buttons-container"
                onClick={() => {
                    LeavePlayerConfirmation();

                }}
                >
                    Leave Game
                </button>
            </div>
        </div>
    </div>);

    const sideContent = (
      <div className="avatar-container">
          {[0, 1, 2, 3, 4, 5].map(index => (
            <div key={`avatar-${index}`}>
                {getAvatarSrc(index) !== null ? generateAvatarElement(index) : null}
            </div>
          ))}
      </div>
    );

    return (
      <div className="gamescreen-container">
          <div className="gamescreen-innerupper-container">
              {(localStorage.getItem("GameHasWinner") === "false") && (
                  <>
                      <Announcer
                          phase={phase}
                          currentPlayerId={parseInt(currentPlayerId)}
                          userId={parseInt(localStorage.getItem("user_id"))}
                          game={game}
                      />
                      <Countdown
                          onComplete={nextState}
                          phase={phase}
                          currentPlayerId={parseInt(currentPlayerId)}
                          userId={parseInt(localStorage.getItem("user_id"))}
                          closeWindow1={closeModal}
                          closeWindow2={closeCardModal}
                          additionalTime={additionalTime}
                          setAdditionalTime={setAdditionalTime}
                      />
                  </>
              )}

              {/*Attack Modal Section*/}
              <section>
                  <AttackModal
                    isModalOpen={isModalOpen}
                    modalContent={modalContent}
                    onClose={closeModal}
                    onMove={moving}
                    lobbyId={lobbyId}
                    gameId={gameId}
                    additionalTime={additionalTime}
                    setAdditionalTime={setAdditionalTime}
                  />
                  {(localStorage.getItem("GameHasWinner") === "false") && (
                  <RiskCardModal
                    isModalOpen={isCardModalOpen}
                    isMidTurn={isMidTurn}
                    onClose={closeCardModal}
                    onTrade={trading}
                    lobbyId={lobbyId}
                    gameId={gameId}
                    additionalTime={additionalTime}
                    setAdditionalTime={setAdditionalTime}
                  />)}
                  <LoseModal
                    isModalOpen={isLoseModalOpen}
                    onClose={closeModal}
                  />
                  <ModalWin
                    isModalOpen={isWinModalOpen}
                    onClose={closeModal}
                  />
                  <LeaveModal
                    isModalOpen={isLeaveModalOpen}
                    onClose={closeModal}
                  />

              </section>
              <canvas id="myCanvas"></canvas>
              {renderButtons}
          </div>
          {lowerContent}
          <div className="container-80-20">
              {sideContent}
          </div>
      </div>
    );
}

export default TitleScreen;

