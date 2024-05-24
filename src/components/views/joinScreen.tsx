import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
import FormFieldID from "../ui/FormField";
import { useNavigate } from "react-router-dom";



const joinScreen = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>(null);

  // update lobby and go to lobby screen
  const goToLobby = async (code) => {
    try {
      //const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
      const players = [localStorage.getItem("user_id")];
      const requestBody = JSON.stringify({ code, players });
      const response = await api.put("/lobbies", requestBody);
      
      if (parseInt(response.data.players.length) >= 6) {
        alert(
          `There are too many players in the lobby, please wait for someone to leave!`
        );
      }
      else {
        const lobbyId = response.data.id;
        const token = response.headers["authorization"];
        localStorage.setItem("lobbyToken", token);
        localStorage.setItem ( "WinLooseScreenWasShown" ,  "false" );
        localStorage.setItem ( "GameHasWinner" , "false" );
        localStorage.setItem ( "GameHasKindaWinner" , "false" );
        navigate("/lobby/" + lobbyId);
      }

    } catch (error) {
      alert(
        `Something went wrong while joining the lobby, did you enter the correct code? \n${handleError(error)}`
      );
    }
  };

  return (
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
      <BaseContainer>
        <div className="basescreen form">
          <div className="basescreen buttons-container" style={{ gap: '30px' }}>
            <FormFieldID
              label="Lobby ID"
              value={code}
              onChange={(un: string) => setCode(un)}
            />
            <div className="basescreen actual-buttons">
              <div className="basescreen buttons">
                <Button
                  width="100%"
                  key = {code}
                  onClick={() => goToLobby(code)}
                  >
                  Confirm
                </Button>
              </div>
              <div className="basescreen buttons">
                <Button
                  width="100%"
                  onClick={() => navigate("/lobby")}
                  >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
}

export default joinScreen;