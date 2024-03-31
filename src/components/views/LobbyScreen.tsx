import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import "styles/views/LobbyScreen.scss";
import {Button} from "../ui/Button";
import {useNavigate, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import { User } from "types";
import Lobby from "models/Lobby";

const LobbyScreen = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>(null);

    const [lobby, setLobby] = useState<Lobby>(null);

    const { lobbyId } = useParams();

    console.log("lobbyId is:", lobbyId);
   
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData(id) {
          try {
            //const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
            
            const response = await api.get(`/lobbies/${id}`);
    
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise((resolve) => setTimeout(resolve, 2000));
    
            // Get the returned users and update the state.
            setLobby(response.data);
            
            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log("request to:", response.request.responseURL);
            console.log("status code:", response.status);
            console.log("status text:", response.statusText);
            console.log("requested data:", response.data);
    
            // See here to get more data.
            console.log(response);
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
    
        fetchData(lobbyId);
    });

    const enterProfile = (id) => {
        navigate("/users/"+id);
      }

    const Player = ({ user }: { user: User }) => (
    <div className="player container" onClick={() => enterProfile(user.id)}>
        <div className="player username">{user.username}</div>
        <div className="player id">
        </div>
    </div>
    );
    
    Player.propTypes = {
    user: PropTypes.object,
    };

    let content = <Spinner />

    if (users) {
        content = (
          <div className="lobby">
            <ul className="lobby user-list">
              {users.map((user: User) => (
                <li key={user.id}>
                  <Player user={user} />
                </li>
              ))}
            </ul>
            </div>
        );
    };

    return (
        <div className="lobby background">
                <div className="lobby base-container">
                    <div className="lobby form">
                       {content}
                    </div>
                </div>
        </div>
    );
};

export default LobbyScreen;