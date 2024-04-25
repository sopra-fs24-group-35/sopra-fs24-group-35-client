import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import "styles/views/LobbyErstellen.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
let riskLogo = require("./Risk.png");

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input type={props.label === "Password" ? "password" : ""}
             className="login input"
             placeholder="enter here.."
             value={props.value}
             onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const LobbyErstellen = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  let user_id = localStorage.getItem("user_id")
  let temp_sol:number = +user_id
  let players = [temp_sol];


  useEffect(() => {
    if (localStorage.getItem("lobbyId") !== null){
      navigate(`/lobby/${localStorage.getItem("lobbyId")}`);
    }
  }, [])


  const doLobbyCreate = async () => {
    try {
      const requestBody = JSON.stringify({ players });
      console.log(requestBody)
      const response = await api.post("/lobbies", requestBody);

      // for some technical reasons, "authorization must be written lowercase"
      const token = response.headers["authorization"];

      console.log("lobbytoken: ", token);

      localStorage.setItem("lobbyToken", token);

      navigate("/lobby/" + response.data.id)
    } catch (error) {
      alert(
        "Something went wrong during the login: \n"+handleError(error)
      );
    }
  }
    const logout = async () => {
        try {
            const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };

            const response = await api.post("/users/logout", null, {headers: config});
            localStorage.removeItem("username");
            localStorage.removeItem("user_id");
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            alert(
                `Something went wrong during the logout: \n${handleError(error)}`
            );
        }
    };

  return (
    <div className="basescreen title-screen" style={{ position: 'relative' }}>
      <div className="basescreen overlay"></div>
      <div className="basescreen title" style={{ marginBottom: '50px', opacity: '0', animation: 'fadeIn 2s forwards' }}>
        <img src={riskLogo} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', position: 'absolute', top: '0', left: '50%', transform: `translate(${-50}%, ${-10}%)` }} alt="My Image" />
      </div>

      <div className="basescreen form" style={{ height: '300px', transform: `translate(${0}%, ${70}%)`}}>
        <div className="basescreen buttons-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, marginTop: '20px' }}>
          <Button
            width="100%"
            onClick={() => navigate("/join")}
            style={{ marginBottom: '15px' }}>
            Join Lobby
          </Button>
          <Button
            width="100%"
            onClick={() => doLobbyCreate()}
            style={{ marginBottom: '15px' }}>
            Create Lobby
          </Button>
          <Button
            width="100%"
            onClick={() => navigate("/avatar")}
            style={{ marginBottom: '15px' }}>
            Change avatar
          </Button>
          <Button
            width="100%"
            onClick={() => logout()}>
            Log out
          </Button>
        </div>
      </div>

    </div>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default LobbyErstellen;


//for more of the function beside the layout (which will change) I need the backend.
// We worked on some design ideas in the meantime