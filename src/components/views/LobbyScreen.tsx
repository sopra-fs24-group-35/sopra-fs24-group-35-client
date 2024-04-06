import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import "styles/views/LobbyScreen.scss";
import {Button} from "../ui/Button";
import {useNavigate, useParams} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { User } from "types";
import Lobby from "models/Lobby";

const LobbyScreen = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>(null);

    const [lobby, setLobby] = useState<Lobby[]>(null);

    const [lobbyOwnerName, setLobbyOwnerName] = useState(null);

    const { lobbyId } = useParams();

    console.log("lobbyId is:", lobbyId);
   
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData(id) {

            try {
                const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };

                const getLobbyResponse = await api.get(`/lobbies/${id}`);
                const lobbyData = getLobbyResponse.data;

                setLobby(lobbyData);

                console.log("players ", lobbyData.players);

                let userIdList = lobbyData.players;

                const requestBody = JSON.stringify({ userIdList });

                const getUsersResponse = await api.post("/users/lobbies", requestBody);

                setUsers(getUsersResponse.data);

                console.log("first userId", userIdList[0]);
                const getOwnerResponse = await api.get("/users/" + userIdList[0], {headers: config})
                const userData = getOwnerResponse.data;
                console.log("response: ", userData);

                setLobbyOwnerName(userData.username);


                console.log("owner name: ", lobbyOwnerName) //this shows null, but it isn't null

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
            
        if (lobbyId){
            fetchData(lobbyId);
        }

        const interval = setInterval(() => {
            if (lobbyId) {
                fetchData(lobbyId);
            }
        }, 5000);
        
        return () => clearInterval(interval);

    }, []);
    
    const enterProfile = (id) => {
        navigate("/users/"+id);
    }

    const leaveLobby = () => {
        const requestBody = JSON.stringify({ "players" : [localStorage.getItem("user_id")] } );
        api.post("/lobbies/" + lobbyId + "/remove", requestBody);
        navigate("/game");
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
                <Button width="100%" style={{ marginBottom: '10px' }}  onClick={() => null}>
                    Start Game
                </Button>
                <Button width="100%" style={{ marginBottom: '10px' }}  onClick={() => leaveLobby()}>
                    Leave Lobby
                </Button>
            </div>
        );
    };

    return (
        <div className="basescreen title-screen">
        <div className="basescreen overlay"></div>
        <BaseContainer className="lobby container">
          <h2>Welcome to {(lobbyOwnerName !== null) ? (lobbyOwnerName + "'s") : ("the")} lobby!</h2>
          <p className="lobby paragraph">
            Joined users:
          </p>
          {content}
        </BaseContainer>
      </div>
    );
};

export default LobbyScreen;