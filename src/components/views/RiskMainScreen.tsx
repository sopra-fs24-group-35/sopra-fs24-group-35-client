import React, { useState } from "react";
//import React, { useEffect } from 'react';
import "styles/views/GameScreen.scss";
import { api, handleError } from "helpers/api";
import {Button} from "../ui/Button";
import {RoundButton} from "../ui/RoundButton";
import BaseContainer from "../ui/BaseContainer";
import { useNavigate, useParams } from "react-router-dom";
import game from "./Game";
import { User } from "../../types";


const TitleScreen: React.FC = () => {
    const buttonRefs = React.useRef<{ [key: string]: HTMLButtonElement }>({});
    const navigate = useNavigate();
    const styles = ["Buddy", "Tinkerbell", "leo", "kiki", "Loki", "Gizmo", "Cali", "Missy", "Sasha", "Rascal", "Nala", "Max", "Harley", "Dusty", "Smokey", "Chester", "Callie", "Oliver", "Snicker"];
    let [num, setNum] = useState(0);
    let [avatarPos, setAvatarPos] = useState(0);
    const [gesamt, setGesamt] = useState(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[num]}`);
    const id = localStorage.getItem("user_id")
    let avatarId
    const [avatar1, setAvatar1] = useState("https://api.dicebear.com/8.x/shapes/svg?seed=Mittens");
    const [avatar2, setAvatar2] = useState("https://api.dicebear.com/8.x/shapes/svg?seed=Mittens");
    const [avatar3, setAvatar3] = useState("https://api.dicebear.com/8.x/shapes/svg?seed=Mittens");
    const [avatar4, setAvatar4] = useState("https://api.dicebear.com/8.x/shapes/svg?seed=Mittens");
    const {gameId} = useParams()
    const lobbyId = localStorage.getItem("lobbyId")
    const [users, setUsers] = useState<User[]>(null);



    const buttonData = [
        { id: 'Alaska', refKey: 'Alaska', text: 'Alaska', xratio: 0.08, yratio:0.14},
        { id: 'Northwest Territory', refKey: 'Northwest Territory', text: 'Northwest Territory', xratio: 0.18, yratio:0.145},
        { id: 'Greenland', refKey: 'Greenland', text: 'Greenland', xratio: 0.35, yratio:0.1 },
        { id: 'Quebec', refKey: 'Quebec', text: 'Quebec', xratio: 0.3, yratio:0.24 },
        { id: 'Ontario', refKey: 'Ontario', text: 'Ontario', xratio: 0.23, yratio:0.24 },
        { id: 'Alberta', refKey: 'Alberta', text: 'Alberta', xratio: 0.16, yratio:0.23},
        { id: 'Western US', refKey: 'Western US', text: 'Western US', xratio: 0.18, yratio:0.335 },
        { id: 'Eastern US', refKey: 'Eastern US', text: 'Eastern US', xratio: 0.24, yratio:0.37 },
        { id: 'Central America', refKey: 'Central America', text: 'Central America', xratio: 0.185, yratio:0.455 },

        { id: 'Venezuela', refKey: 'Venezuela', text: 'Venezuela', xratio: 0.26, yratio:0.55 },
        { id: 'Brazil', refKey: 'Brazil', text: 'Brazil', xratio: 0.31, yratio:0.63 },
        { id: 'Peru', refKey: 'Peru', text: 'Peru', xratio: 0.27, yratio:0.676 },
        { id: 'Argentina', refKey: 'Argentina', text: 'Argentina', xratio: 0.28, yratio:0.79 },

        { id: 'Ukraine', refKey: 'Ukraine', text: 'Ukraine', xratio: 0.582, yratio:0.275 },
        { id: 'Northern Europe', refKey: 'Northern Europe', text: 'Northern Europe', xratio: 0.50, yratio:0.33 },
        { id: 'Southern Europe', refKey: 'Southern Europe', text: 'Southern Europe', xratio: 0.51, yratio:0.425 },
        { id: 'Iceland', refKey: 'Iceland', text: 'Iceland', xratio: 0.435, yratio:0.2 },
        { id: 'Western Europe', refKey: 'Western Europe', text: 'Western Europe', xratio: 0.43, yratio:0.47 },
        { id: 'Scandinavia', refKey: 'Scandinavia', text: 'Scandinavia', xratio: 0.505, yratio:0.19 },
        { id: 'Great Britain', refKey: 'Great Britain', text: 'Great Britain', xratio: 0.42, yratio:0.315 },

        { id: 'Egypt', refKey: 'Egypt', text: 'Egypt', xratio: 0.54, yratio:0.565 },
        { id: 'East Africa', refKey: 'East Africa', text: 'East Africa', xratio: 0.58, yratio:0.656 },
        { id: 'Congo', refKey: 'Congo', text: 'Congo', xratio: 0.54, yratio:0.72 },
        { id: 'South Africa', refKey: 'South Africa', text: 'South Africa', xratio: 0.55, yratio:0.84 },
        { id: 'North Africa', refKey: 'North Africa', text: 'North Africa', xratio: 0.48, yratio:0.6 },
        { id: 'Madagascar', refKey: 'Madagascar', text: 'Madagascar', xratio: 0.627, yratio:0.84 },

        { id: 'Indonesia', refKey: 'Indonesia', text: 'Indonesia', xratio: 0.805, yratio:0.71 },
        { id: 'New Guniea', refKey: 'New Guniea', text: 'New Guniea', xratio: 0.884, yratio:0.68 },
        { id: 'Western Australia', refKey: 'Western Australia', text: 'Western Australia', xratio: 0.84, yratio:0.85 },
        { id: 'Eastern Australia', refKey: 'Eastern Australia', text: 'Eastern Australia', xratio: 0.915, yratio:0.82 },

        { id: 'Ural', refKey: 'Ural', text: 'Ural', xratio: 0.685, yratio:0.25 },
        { id: 'Siberia', refKey: 'Siberia', text: 'Siberia', xratio: 0.735, yratio:0.16 },
        { id: 'Yakutsk', refKey: 'Yakutsk', text: 'Yakutsk', xratio: 0.805, yratio:0.12 },
        { id: 'Irkutsk', refKey: 'Irkutsk', text: 'Irkutsk', xratio: 0.792, yratio:0.25 },
        { id: 'Kamchatka', refKey: 'Kamchatka', text: 'Kamchatka', xratio: 0.88, yratio:0.13 },
        { id: 'Japan', refKey: 'Japan', text: 'Japan', xratio: 0.895, yratio:0.35 },
        { id: 'Mongolia', refKey: 'Mongolia', text: 'Mongolia', xratio: 0.805, yratio:0.345 },
        { id: 'China', refKey: 'China', text: 'China', xratio: 0.76, yratio:0.42 },
        { id: 'Afghanistan', refKey: 'Afghanistan', text: 'Afghanistan', xratio: 0.665, yratio:0.36 },
        { id: 'Middle East', refKey: 'Middle East', text: 'Middle East', xratio: 0.61, yratio:0.535 },
        { id: 'India', refKey: 'India', text: 'India', xratio: 0.715, yratio:0.51 },
        { id: 'Siam', refKey: 'Siam', text: 'Siam', xratio: 0.785, yratio:0.55 },
    ];

    const getButtonRatiosById = (id) => {
        const button = buttonData.find(button => button.id === id);
        return button ? { xratio: button.xratio, yratio: button.yratio } : { xratio: 0, yratio: 0 }; // Return xratio and yratio if the button is found, otherwise return default values
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
        marginRight: '10px', // Adjust the space between images
        border: '4px solid red', // Red outline
    };

    const avatarStyle: React.CSSProperties = {
        width: '75px', // Adjust the size of the circle
        height: '75px', // Adjust the size of the circle
        borderRadius: '50%', // Makes the image circular
        overflow: 'hidden', // Hides the overflow
        marginRight: '10px', // Adjust the space between image
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
        console.log(newNum)
        setGesamt(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[newNum]}`);
    }

    const fetchData = async () => {
        try {
            const config = { Authorization: localStorage.getItem("lobbyToken") };
            // get lobby info
            console.log(config)
            const getLobbyResponse = await api.get(`/lobbies/${lobbyId}`, { headers: config });
            const lobbyData = getLobbyResponse.data;

            // set the userIdList to an array of longs consisting of all the user IDs in the lobby
            let userIdList = lobbyData.players;

            const requestBody = JSON.stringify({ userIdList })
            const getUserResponse = await api.post("users/lobbies", requestBody);

            // Set the state after fetching data
            let requestBodyGame =JSON.stringify({lobbyId})
            const getGame = await api.get(`/lobbies/${lobbyId}/game/${gameId}`, { headers: config }, requestBodyGame)
            console.log(getGame.data)

            getUserResponse.data.forEach(user => {
                // Access each user object here

                if(avatarPos === 0){
                    setAvatar1(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[user.avatarId]}`)
                    setAvatarPos(num +1)
                }
                else if(avatarPos === 1){
                    setAvatar2(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[user.avatarId]}`)
                    setAvatarPos(num +1)
                }
                else if(avatarPos === 2){
                    setAvatar3(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[user.avatarId]}`)
                    setAvatarPos(num +1)
                }
                else if(avatarPos === 3){
                    setAvatar4(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[user.avatarId]}`)
                    setAvatarPos(num +1)
                }
            });

        } catch (error) {
            alert(`Something went wrong with fetching the user data: \n${handleError(error)}`);
        }
    };
    const nextSate = document.getElementById('nextState');
    React.useEffect(() => {

        fetchData()
        // Canvas setup
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const imageSrc = require('./RiskMap21.png');

        const resizeCanvas = () => {
            /*            canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;*/

            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;

            const image = new Image();
            image.src = imageSrc;
            /*            image1.onload = function(){
                            ctx.drawImage(image1, 0, 0, canvas.width, canvas.height*0.8);

                        }*/

    const resizeButtons = (startx:number, starty:number, drawWidth: number, drawHeight: number) => {
        const buttonWidth = drawWidth * 0.03; // Button width as a percentage of the draw width
        const buttonHeight = drawHeight * 0.05; // Button height as a percentage of the draw height

        Object.keys(buttonRefs.current).forEach((buttonId: string) => {
            const button = buttonRefs.current[buttonId];
            const { x, y } = calculateButtonPosition(drawWidth, drawHeight, startx, starty, buttonId);

            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
            button.style.width = `${buttonWidth}px`;
            button.style.height = `${buttonHeight}px`;
            button.style.fontSize = `${buttonHeight*0.35}px`;
        });
    };

    const calculateButtonPosition = (drawWidth: number, drawHeight: number, startx:number, starty:number, buttonId: string) => {


        const {xratio, yratio} = getButtonRatiosById(buttonId)
        let x = startx + drawWidth * xratio; // Default left position
        let y = starty + drawHeight * yratio; // Default top position

        return { x, y };
    };


            image.onload = () => {
                const aspectRatio = image.width / image.height;
                let drawWidth = canvas.width;
                let drawHeight = canvas.height;

                // Adjust the size of the image to maintain aspect ratio
                if (drawWidth / drawHeight > aspectRatio) {
                    drawWidth = drawHeight * aspectRatio;
                } else {
                    drawHeight = drawWidth / aspectRatio;
                }

                // Center the image on the canvas
                const x = (canvas.width - drawWidth) / 2;
                const y = (canvas.height - drawHeight) / 2;

                // Clear the canvas and draw the image
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, x, y, drawWidth, drawHeight);
                resizeButtons(x, y, drawWidth, drawHeight);
            };
        };

        // Initial setup
        resizeCanvas();

        // Handle resize event
        window.addEventListener('resize', resizeCanvas);


        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };



    }, []);

    return (
        <div className="gamescreen-container">
            <div className="gamescreen-innerupper-container">
                <canvas id="myCanvas"></canvas>
                {/* North America */}
                {buttonData.map((button) => (
                    <button
                        key={button.id}
                        id={button.id}
                        ref={(buttonRef) => {
                            if (buttonRef) buttonRefs.current[button.refKey] = buttonRef;
                        }}
                        className="button"
                        style={{ backgroundColor: button.refKey === 'redButton' ? 'red' : 'blue' }}
                    >
                        {button.text}
                    </button>
                ))}
            </div>
            <div className="gamescreen-innerlower-container">
                <button
                    id="nextState"
                    className="gamescreen-buttons-container"
                    style={{
                        left: '5%',
                        top: '25%',
                        backgroundColor: 'red',
                    }}
                >
                Next State
                </button>
                <div className="basescreen title-screen">
                    <div className="basescreen overlay"></div>
                    <BaseContainer>
                        <div className="basescreen form">
                            <div style={containerStyle}>
                                <div style={imagePairStyle}>
                                    {num !== 0 ? (
                                      <div style={avatarStyle}>
                                          <img src={avatar1} alt="avatar" style={imageStyle} />
                                      </div>
                                    ) : (
                                      <div style={avatarStylePlaying}>
                                          <img src={avatar1} alt="avatar" style={imageStyle} />
                                      </div>
                                    )}
                                    {num !== 1 ? (
                                      <div style={avatarStyle}>
                                          <img src={avatar2} alt="avatar" style={imageStyle} />
                                      </div>
                                    ) : (
                                      <div style={avatarStylePlaying}>
                                          <img src={avatar2} alt="avatar" style={imageStyle} />
                                      </div>
                                    )}
                                    {num !== 2 ? (
                                      <div style={avatarStyle}>
                                          <img src={avatar3} alt="avatar" style={imageStyle} />
                                      </div>
                                    ) : (
                                      <div style={avatarStylePlaying}>
                                          <img src={avatar3} alt="avatar" style={imageStyle} />
                                      </div>
                                    )}
                                    {num !== 3 ? (
                                      <div style={avatarStyle}>
                                          <img src={avatar4} alt="avatar" style={imageStyle} />
                                      </div>
                                    ) : (
                                      <div style={avatarStylePlaying}>
                                          <img src={avatar4} alt="avatar" style={imageStyle} />
                                      </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </BaseContainer>
                </div>
            </div>
        </div>
    );
}

export default TitleScreen;


