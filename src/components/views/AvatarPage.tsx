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
  const styles = [];
  styles.push("Buddy", "Tinkerbell", "Leo", "Kiki", "Loki", "Gizmo", "Cali", "Missy", "Sasha", "Rascal", "Nala", "Max", "Harley", "Dusty", "Smokey", "Chester", "Callie", "Oliver", "Snicker");
  let num = 0;
  let gesamt = "https://api.dicebear.com/8.x/thumbs/svg?seed=Buddy}"
  let style = styles[num]
  // update lobby and go to lobby screen
  const AvatarCreation = async () => {
      num++
      if (num > styles.length-1){
        num = 0
      }
      style = styles[num]
      let begin = "https://api.dicebear.com/8.x/thumbs/svg?seed="
      let gesamt = begin.concat(style)
      console.log(gesamt)
  };

  return (
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
      <BaseContainer>
        <div className="basescreen form">
          <div className="basescreen buttons-container" style={{ gap: "30px" }}>
            <Button
              onClick={() => AvatarCreation()}
            >
              Confirm
            </Button>

            <img
              src= {gesamt}
              alt="avatar" />
          </div>
        </div>
      </BaseContainer>
    </div>
  );
}

export default AvatarPage;