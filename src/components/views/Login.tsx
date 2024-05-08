import React, { useState, useEffect } from "react";
import { loginapi, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import FormField from "../ui/FormField";
import FormFieldPassword from "../ui/FormFieldPassword";
import CardScrollbar from "../ui/CardScrollbar";
let riskLogo = require("./Risk.png");


const Login = () => {
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
      <div className="basescreen title" style={{ marginBottom: '50px', width: '100px', opacity: '0', animation: 'fadeIn 2s forwards' }}>
        <img src={riskLogo} style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto', position: 'absolute', top: '0', left: '50%', transform: `translate(${-50}%, ${-20}%)` }} alt="My Image" />
      </div>
      <BaseContainer>
        <div className="login container">
          <div className="login form">
            <h3> Login </h3>
            <FormField
              label="Username"
              value={username}
              onChange={(un: string) => setUsername(un)}
            />
            <FormFieldPassword
              label="Password"
              value={password}
              onChange={(n) => setPassword(n)}
            />
            <div className="login button-container">
              <Button
                disabled={!username || !password}
                width="100%"
                onClick={() => doLogin()}
              >
                Login
              </Button>
            </div>
            <div className="login button-container">
              <Button
                width="100%"
                onClick={() => gotoRegistration()}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );


};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Login;
