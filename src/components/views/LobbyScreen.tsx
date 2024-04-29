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
import ApiStyles from "helpers/avatarApiStyles";
import game from "./Game";
import { compileString } from "sass";


const LobbyScreen = () => {

    const navigate = useNavigate();

    const apiStyles = new ApiStyles;

    const [users, setUsers] = useState<User[]>(null);

    const [lobby, setLobby] = useState<Lobby[]>(null);

    const [lobbyOwnerId, setLobbyOwnerId] = useState(null);

    const [startingGame, setStartingGame] = useState(false);

    const [startingTimer, setStartingTimer] = useState(5);

    const { lobbyId } = useParams();

    const [gameId, setGameId] = useState(null);

    useEffect(() => {
        localStorage.setItem("lobbyId", lobbyId)
        let timeoutId;

        if(lobby !== null && lobby.gameId !== null){
            navigate(`/risk/${lobby.gameId}`);
        }
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData(id) {

            try {
                
                const config = {Authorization: localStorage.getItem("lobbyToken")};

                // get lobby info
                const getLobbyResponse = await api.get(`/lobbies/${id}`, {headers: config});
                const lobbyData = getLobbyResponse.data;

                setLobby(lobbyData);

                // set the userIdList to an array of longs consisting of all the user IDs in the lobby
                let userIdList = lobbyData.players;

                setLobbyOwnerId(userIdList[0]);

                const requestBody = JSON.stringify({ userIdList });

                // get a list of the users according to the userIdList
                const getUsersResponse = await api.post("/users/lobbies", requestBody);

                setUsers(getUsersResponse.data);

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

        function debouncedFetchData(id) {
            // Clear the previous timeout
            clearTimeout(timeoutId);
            // Set a new timeout to call fetchData after 20000 milliseconds
            timeoutId = setTimeout(() => {
                fetchData(id);
            }, 500);
        }

        // Initial fetch
        if (lobbyId) {
            debouncedFetchData(lobbyId);
        }

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);


    }, [lobby]); // <-- add lobbyOwnerName again if needed as dependency


    const leaveLobby = async () => {
        try {
            //const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
            const players = [Number(localStorage.getItem("user_id"))];
            const requestBody = JSON.stringify({ players });
            console.log("requestBody", requestBody);
            await api.put(`/lobbies/${lobbyId}/remove`, requestBody);
            localStorage.removeItem("lobbyId")
            localStorage.removeItem("lobbyToken")
            navigate("/game");
            /*if (!users){
                const response2 = await api.
            }*/

        } catch (error) {
            alert(
              `Something went wrong while leaving the lobby! \n${handleError(error)}`
            );
        }
    }
    const getGame = async () => {
        const requestBody = JSON.stringify({lobbyId,users});
        const config = { Authorization: localStorage.getItem("lobbyToken") };
        // get lobby info

        const getLobbyResponse = await api.post(`/lobbies/${lobbyId}/game`, requestBody, {headers: config});
        let gameId = getLobbyResponse.data.gameId;
        localStorage.setItem("gameId", gameId);
        //console.log(getLobbyResponse)
        navigate(`/risk/${gameId}`);
    }

    let timer = null;

    const gameStart = () => {
        setStartingGame(true);
    }

    const cancelGameStart = () => {
        setStartingGame(false);
    }

    var startGame = null;

    useEffect(() => {

        if (startingGame){
            timer = 5;
            startGame = setInterval(() => {
                if (timer <= 1) {
                    clearInterval(startGame);
                    if (startingGame) {
                        getGame()
                    }
                } else if (!startingGame || !timer) {
                    clearInterval(startGame);
                }
                timer -= 1; // Decrease the timer value
                setStartingTimer(timer);
            }, 1000)
        }
        else {
            clearInterval(startGame); // Stop the interval
            timer = null; // Reset the timer variable
            setStartingTimer(5);
        }
    }, [startingGame]);

    useEffect(() => {
        const interval = startGame;
        return () => {
            clearInterval(interval);
        }
    }, [startingGame])

    const Player = ({ user }: { user: User }) => (
        <div
            className="lobby-player container">{/*onClick={() => enterProfile(user.id)} put this back in in case we need it*/}
            <div className="lobby-player username">{user.username}</div>
            <img className="lobby-player avatar"
                 src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${apiStyles.styles[user.avatarId]}`} alt="Avatar"/>
        </div>
    );

    Player.propTypes = {
        user: PropTypes.object,
    };

    let content = <Spinner/>

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
                {(lobbyOwnerId === parseInt(localStorage.getItem("user_id")) && !startingGame) ? 
                (
                <Button width="100%" style={{ marginBottom: '10px' }}  onClick={gameStart}>
                    Start Game
                </Button>
                ) : ((lobbyOwnerId === parseInt(localStorage.getItem("user_id"))) &&
                <Button width="100%" style={{ marginBottom: '10px' }}  onClick={cancelGameStart}>
                    Cancel Game
                </Button>
                )
                }
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
          <h2>{(users !== null) ? ("Welcome to " + users[0].username + "'s lobby!") : ("The lobby is loading.")}</h2>
          <h3>The lobby code is { (lobby !== null) ? (lobby.code) : ("loading :)") }</h3>
          {startingGame && (<h4 className="countdown">Game starts in: {startingTimer}</h4>)}
          <p className="lobby paragraph">
            Joined players:
          </p>
          {content}
        </BaseContainer>
      </div>
    );
};

export default LobbyScreen;