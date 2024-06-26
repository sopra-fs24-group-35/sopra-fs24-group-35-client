import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import {useNavigate} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";
import FormFieldID from "../ui/FormField";

const Game = () => {
  // use react-router-dom's hook to access navigation, more info: https://reactrouter.com/en/main/hooks/use-navigate 
  const navigate = useNavigate();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://react.dev/learn/state-a-components-memory and https://react.dev/reference/react/useState 
  const [users, setUsers] = useState<User[]>(null);

  useEffect(() => {
    if (localStorage.getItem("lobbyId") !== null){
      navigate(`/lobby/${localStorage.getItem("lobbyId")}`);
    }
  }, [])

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

  

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://react.dev/reference/react/useEffect 
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the users! See the console for details."
        );
      }
    }

    fetchData();
    navigate("/lobby");
  }, []);
  
  let content = (
    <div className="game">
      {/*
      <ul className="game user-list">
        {users.map((user: User) => (
          <li key={user.id}>
            <Player user={user} />
          </li>
        ))}
        </ul>*/}
        <Button width="100%" style={{ marginBottom: '10px' }}  onClick={() => navigate("/lobby")}>
          Lobby Options
        </Button>
        <Button width="100%" style={{ marginBottom: '10px' }}  onClick={() => navigate("/avatar")}>
          Avatar Screen
        </Button>
        <Button width="100%" style={{ marginBottom: '10px' }} onClick={() => logout()}>
          Logout
        </Button>
    </div>
  );
  

  return (
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
      <BaseContainer className="game container">
        <h2>Hello, {localStorage.username}!</h2>
        <p className="game paragraph">
          {/*List of users:*/}
        </p>
        {content}
      </BaseContainer>
    </div>
  );
};

export default Game;
