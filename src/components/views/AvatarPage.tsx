import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
import FormFieldID from "../ui/FormField";
import { useNavigate } from "react-router-dom";
import * as Console from "console";



const AvatarPage = () => {
  const navigate = useNavigate();
  const styles = ["Buddy", "Tinkerbell", "leo", "kiki", "Loki", "Gizmo", "Cali", "Missy", "Sasha", "Rascal", "Nala", "Max", "Harley", "Dusty", "Smokey", "Chester", "Callie", "Oliver", "Snicker"];
  const [num, setNum] = useState(0);
  const [gesamt, setGesamt] = useState(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[num]}`);

  // Update lobby and go to lobby screen
  const AvatarCreation = () => {
    let newNum = num + 1;
    if (newNum >= styles.length) {
      newNum = 0;
    }
    setNum(newNum);
    setGesamt(`https://api.dicebear.com/8.x/thumbs/svg?seed=${styles[newNum]}`);
  }
  const safeAvatar = () => {
    localStorage.setItem("avatar", gesamt)
    console.log(localStorage.getItem("avatar"))
  };


  return (
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
      <BaseContainer>
        <div className="basescreen form">
          <img style={{ marginBottom: '10px' }} src={gesamt} alt="avatar" />
          <Button style={{ marginBottom: '10px' }} onClick={AvatarCreation}>Switch</Button>
          <Button style={{ marginBottom: '10px' }} onClick= {() => safeAvatar()}>Save</Button>
        </div>
      </BaseContainer>
    </div>
  );
};

export default AvatarPage;