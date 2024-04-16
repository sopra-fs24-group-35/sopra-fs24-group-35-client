import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
import FormFieldID from "../ui/FormField";
import { useNavigate, useParams } from "react-router-dom";
import * as Console from "console";
import User from "models/User";



const AvatarPage = () => {
  const navigate = useNavigate();
  const styles = ["Buddy", "Tinkerbell", "leo", "kiki", "Loki", "Gizmo", "Cali", "Missy", "Sasha", "Rascal", "Nala", "Max", "Harley", "Dusty", "Smokey", "Chester", "Callie", "Oliver", "Snicker"];
  const [num, setNum] = useState(0);
  const [gesamt, setGesamt] = useState(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[num]}`);
  const id = localStorage.getItem("user_id")
  let avatarId
  const [anzeige, setAnzeige] = useState(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[num]}`);
  const [user, setUser] = useState<User>(null);
  let tempId = null

  useEffect(() => {
    async function gettheUser(id) {
      try {
        const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
        const response = await api.get("/users/"+id, {headers: config});
        setUser(new User(response.data))
        avatarId = response.data.avatarId
        setAnzeige(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[avatarId]}`);
      } catch (error) {
        alert(
          `Something went wrong with fetching the user data: \n${handleError(error)}`
        );
      }
    };
    gettheUser(id);
  }, []);
  // Update lobby and go to lobby screen
  const AvatarCreation = () => {
    let newNum = num + 1;
    if (newNum >= 4) {
      newNum = 0;
    }
    setNum(newNum);
    console.log(newNum)
    setGesamt(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[newNum]}`);
  }
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


  return (
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
      <BaseContainer>
        <div className="basescreen form">
          <button
            onClick={() =>AvatarCreation()}
            > Count
          </button>
          <div style={containerStyle}>
            <div style={imagePairStyle}>
              {num !== 0 ? (
                <div style={avatarStyle}>
                  <img src={anzeige} alt="avatar" style={imageStyle} />
                </div>
              ):(
                <div style={avatarStylePlaying}>
                  <img src={anzeige} alt="avatar" style={imageStyle} />
                </div>
              )}
              {num !== 1 ? (
                <div style={avatarStyle}>
                  <img src={anzeige} alt="avatar" style={imageStyle} />
                </div>
              ):(
                <div style={avatarStylePlaying}>
                  <img src={anzeige} alt="avatar" style={imageStyle} />
                </div>
              )}
              {num !== 2 ? (
                <div style={avatarStyle}>
                  <img src={anzeige} alt="avatar" style={imageStyle} />
                </div>
              ):(
                <div style={avatarStylePlaying}>
                  <img src={anzeige} alt="avatar" style={imageStyle} />
                </div>
              )}
              {num !== 3 ? (
                <div style={avatarStyle}>
                  <img src={anzeige} alt="avatar" style={imageStyle} />
                </div>
              ):(
                <div style={avatarStylePlaying}>
                  <img src={anzeige} alt="avatar" style={imageStyle} />
                </div>
              )}
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default AvatarPage;