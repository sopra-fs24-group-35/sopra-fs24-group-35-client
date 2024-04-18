import React, { useState } from "react";
//import React, { useEffect } from 'react';
import "styles/views/GameScreen.scss";
import { api, handleError } from "helpers/api";
import {Button} from "../ui/Button";
import {RoundButton} from "../ui/RoundButton";
import BaseContainer from "../ui/BaseContainer";
import { useNavigate } from "react-router-dom";

const TitleScreen: React.FC = () => {
    const redButtonRef = React.useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const styles = ["Buddy", "Tinkerbell", "leo", "kiki", "Loki", "Gizmo", "Cali", "Missy", "Sasha", "Rascal", "Nala", "Max", "Harley", "Dusty", "Smokey", "Chester", "Callie", "Oliver", "Snicker"];
    const [num, setNum] = useState(0);
    const [gesamt, setGesamt] = useState(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[num]}`);
    const id = localStorage.getItem("user_id")
    let avatarId
    const [anzeige, setAnzeige] = useState(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[num]}`);
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
            /*            canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;*/

            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;

            const image = new Image();
            image.src = imageSrc;
            /*            image1.onload = function(){
                            ctx.drawImage(image1, 0, 0, canvas.width, canvas.height*0.8);

                        }*/


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

                const buttonWidth = drawWidth * 0.03; // Button width as a percentage of the draw width
                const buttonHeight = drawHeight * 0.05; // Button height as a percentage of the draw height
                if (redButtonRef.current) {
                    const redButton = redButtonRef.current;
                    redButton.style.left = `${x + drawWidth * 0.3}px`; // Adjust 30% of draw width from the left edge
                    redButton.style.top = `${y + drawHeight * 0.5}px`; // Adjust 5% of draw height from the top edge
                    redButton.style.width = `${buttonWidth}px`;
                    redButton.style.height = `${buttonHeight}px`;
                }
            };
        };

        // Initial setup
        resizeCanvas();

        // Handle resize event
        window.addEventListener('resize', resizeCanvas);

        const handleGreenButtonClick = () => {
            alert('Green Button Clicked!');
        };
        const handleRedButtonClick = () => {
            alert('Red Button Clicked!');
        };
        const handleBlueButtonClick = () => {
            alert('Blue Button Clicked!');
        };
        const redButton = redButtonRef.current;

        if (redButton) {
        redButton?.addEventListener('click', handleRedButtonClick);
        }
        // Clean up event listeners when component unmounts
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (redButton) {
            redButton?.removeEventListener('click', handleRedButtonClick);
            }
        };
    }, []);

    return (
        <div className="gamescreen-container">
            <div className="gamescreen-innerupper-container">
                <canvas id="myCanvas"></canvas>
                <button
                    id="redButton"
                    ref={redButtonRef}
                    className="button"
                    style={{
                        backgroundColor: 'red',
                    }}
                >
                    Red
                </button>
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


