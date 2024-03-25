import React, { useState } from "react";
import { loginapi, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Registration.scss";
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
    <div className="registration field">
      <label className="registration label">{props.label}</label>
      <input
        className="registration input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.value==="password" ? "password" : "text"}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  const doRegistration = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await loginapi.post("/users/registration", requestBody);
      console.log("response: " + JSON.stringify(response));
      // for some technical reasons, "authorization must be written lowercase"
      const token = response.headers["authorization"];
      // Get the returned user and update a new object.
      const user = new User(response.data);
      user.token = token;
      // Store the username, user ID and the token into the local storage.
      localStorage.setItem("username", user.username);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("token", token);
      console.log(token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      navigate("/game");
    } catch (error) {
      alert(
        `Something went wrong during the login: \n${handleError(error)}`
      );
    }
  };

  return (
    <BaseContainer>
      <div className="registration container">
        <div className="registration form">
          <h3> Registration </h3>
          <FormField
            label="Enter your username:"
            value={username}
            onChange={(un: string) => setUsername(un)}
          />
          <FormField
            label="Enter your password:"
            value={password}
            onChange={(n) => setPassword(n)}
          />
          <label style={{fontSize: "0.75em"}}> (Your password needs to be at least 8 characters long.) </label>
          <div className="login button-container">
            <Button
              disabled={!username || (!password || password.length < 8)}
              width="100%"
              onClick={() => doRegistration()}
            >
              Register now!
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Registration;
