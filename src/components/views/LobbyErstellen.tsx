import React, { useState, useEffect } from "react";
import { loginapi, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

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
  const [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);


  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await loginapi.post("/users/login", requestBody);
      // Get the returned user and update a new object.
      const user = new User(response.data);
      // for some technical reasons, "authorization must be written lowercase"
      const token = response.headers["authorization"];
      // Store the username, user ID and the token into the local storage.
      localStorage.setItem("username", user.username);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("token", token);
      navigate("/game");


    } catch (error) {
      alert(
        "Something went wrong during the login: \n"+handleError(error)
      );
    }
  };

  const gotoRegistration = async () => {
    navigate("/registration");
  };

  return (
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
      <BaseContainer>
        <div className="basescreen form">
          <div className="basescreen title">Risk: Global Domination</div>
          <div className="basescreen buttons-container" style={{gap: '30px'}}>
            <Button
              width="100%"
              onClick ={() => navigate("/join")}>
              Join Lobby
            </Button>
            <Button
              width="100%">
              Crate Lobby
            </Button>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default LobbyErstellen;


//for more of the function beside the layout (which will change) I need the backend.
// We worked on some design ideas in the meantime