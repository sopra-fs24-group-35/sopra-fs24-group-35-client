import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
import FormFieldID from "../ui/FormField";
import { useNavigate } from "react-router-dom";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
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
  };

  return (
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
      <BaseContainer>
        <div className="basescreen form">
          <div className="basescreen buttons-container" style={{ gap: "30px" }}>
            <Button onClick={AvatarCreation}>Confirm</Button>
            <img src={gesamt} alt="avatar" />
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default AvatarPage;