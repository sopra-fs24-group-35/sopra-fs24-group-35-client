import React, { useState } from "react";
//import React, { useEffect } from 'react';
import "styles/views/GameScreen.scss";
import { api, handleError } from "helpers/api";
import {Button} from "../ui/Button";
import {RoundButton} from "../ui/RoundButton";
import BaseContainer from "../ui/BaseContainer";
import { useNavigate } from "react-router-dom";

const TitleScreen: React.FC = () => {
    const buttonRefs = React.useRef<{ [key: string]: HTMLButtonElement }>({});
    const navigate = useNavigate();
    const styles = ["Buddy", "Tinkerbell", "leo", "kiki", "Loki", "Gizmo", "Cali", "Missy", "Sasha", "Rascal", "Nala", "Max", "Harley", "Dusty", "Smokey", "Chester", "Callie", "Oliver", "Snicker"];
    const [num, setNum] = useState(0);
    const [gesamt, setGesamt] = useState(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[num]}`);
    const id = localStorage.getItem("user_id")
    let avatarId
    const [anzeige, setAnzeige] = useState(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[num]}`);
    const [startButton, setStartButton] = useState<string | null>(null);
    const [endButton, setEndButton] = useState<string | null>(null);
    const [drawingLine, setDrawingLine] = useState(false);

    //reload idea

    const [curx, setX] = useState(0);
    const [cury, setY] = useState(0);
    const [curwidth, setCurWidth] = useState(0);
    const [curheight, setCurHeight] = useState(0);
    const [picture, setPicture] = useState(null);

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

    const handleButtonClick = (id: string) => {
        console.log("First Terri: " + startButton + ", Second Terri: " + endButton + ", drawline: " + drawingLine + ".");
        if (drawingLine) {
            // Draw line between start button and clicked button
            undoLine(startButton, id);
            setStartButton(null);
            setEndButton(null);
            setDrawingLine(false); // Reset drawing line mode
            setStartButton(id);
        }else if(startButton){
            drawLine(startButton, id);
            setDrawingLine(true); // Enable drawing line mode
        } else {
            setStartButton(id);
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
        console.log(distance);

        let ratio = scaledPercentage; // Adjust this ratio as needed
        if(ratio > 1){
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

    const undoLine = (startId: string, endId: string) => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        // Clear the canvas
        ctx.clearRect(curx, cury, curwidth, curheight);
        ctx.drawImage(picture, curx, cury, curwidth, curheight);

        //setReload(true);
    };

    const getButtonCoordinatesById = (id) => {
        const button = buttonRefs.current[id];
        if (button) {
            const rect = button.getBoundingClientRect();
            return { x: (rect.left+rect.right)/2, y: (rect.top+rect.bottom)/2 };
        } else {
            return { x: 0, y: 0 }; // Default position if button is not found
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

    const nextSate = document.getElementById('nextState');
    React.useEffect(() => {
        async function gettheUser(id) {
            try {
                const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
                const response = await api.get("/users/"+id, {headers: config});
                avatarId = response.data.avatarId
                setAnzeige(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[avatarId]}`);
            } catch (error) {
                alert(
                  `Something went wrong with fetching the user data: \n${handleError(error)}`
                );
            }
        };
        // Canvas setup
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const imageSrc = require('./RiskMap21.png');

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;

            const image = new Image();
            image.src = imageSrc;
            setPicture(image);

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

                setCurHeight(drawHeight);
                setCurWidth(drawWidth);
                setX(x);
                setY(y);


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
                        onClick={() => handleButtonClick(button.id)}
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
                            <button
                              onClick={() => AvatarCreation()}
                            > Count
                            </button>
                            <div style={containerStyle}>
                                <div style={imagePairStyle}>
                                    {num !== 0 ? (
                                      <div style={avatarStyle}>
                                          <img src={anzeige} alt="avatar" style={imageStyle} />
                                      </div>
                                    ) : (
                                      <div style={avatarStylePlaying}>
                                          <img src={anzeige} alt="avatar" style={imageStyle} />
                                      </div>
                                    )}
                                    {num !== 1 ? (
                                      <div style={avatarStyle}>
                                          <img src={anzeige} alt="avatar" style={imageStyle} />
                                      </div>
                                    ) : (
                                      <div style={avatarStylePlaying}>
                                          <img src={anzeige} alt="avatar" style={imageStyle} />
                                      </div>
                                    )}
                                    {num !== 2 ? (
                                      <div style={avatarStyle}>
                                          <img src={anzeige} alt="avatar" style={imageStyle} />
                                      </div>
                                    ) : (
                                      <div style={avatarStylePlaying}>
                                          <img src={anzeige} alt="avatar" style={imageStyle} />
                                      </div>
                                    )}
                                    {num !== 3 ? (
                                      <div style={avatarStyle}>
                                          <img src={anzeige} alt="avatar" style={imageStyle} />
                                      </div>
                                    ) : (
                                      <div style={avatarStylePlaying}>
                                          <img src={anzeige} alt="avatar" style={imageStyle} />
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


