//import React from 'react';
import React, { useEffect } from 'react';
import "styles/views/GameScreen.scss";
import {Button} from "../ui/Button";
import {RoundButton} from "../ui/RoundButton";
import BaseContainer from "../ui/BaseContainer";

const TitleScreen: React.FC = () => {
    useEffect(() => {
        // Canvas setup
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const image1 = new Image();
            image1.src = 'Original5.jpg';
            image1.onload = function(){
                ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
            }


/*            image.onload = () => {
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
            };*/
        };

        // Initial setup
        resizeCanvas();

        // Handle resize event
        window.addEventListener('resize', resizeCanvas);

        // Button click event listeners
        const greenButton = document.getElementById('greenButton');
        const redButton = document.getElementById('redButton');
        const nextSate = document.getElementById('nextState');
        const handleGreenButtonClick = () => {
            alert('Green Button Clicked!');
        };
        const handleRedButtonClick = () => {
            alert('Red Button Clicked!');
        };

        greenButton?.addEventListener('click', handleGreenButtonClick);
        redButton?.addEventListener('click', handleRedButtonClick);

        // Clean up event listeners when component unmounts
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            greenButton?.removeEventListener('click', handleGreenButtonClick);
            redButton?.removeEventListener('click', handleRedButtonClick);
        };
    }, []);

    return (
        <div className="gamescreen-container">
            <div className="gamescreen-innerupper-container">
                <canvas id="myCanvas"></canvas>
                <button
                    id="greenButton"
                    className="button"
                    style={{
                        left: '3%',
                        top: '5%',
                        backgroundColor: 'blue',

                    }}
                >
                    Green
                </button>
                <button
                    id="redButton"
                    className="button"
                    style={{
                        left: '30%',
                        top: '5%',
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
            </div>
        </div>
    );
}

export default TitleScreen;


