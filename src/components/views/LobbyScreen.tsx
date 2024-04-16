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

    const [lobbyOwnerId, setLobbyOwnerId] = useState(null);

    const [startingGame, setStartingGame] = useState(false);

    const { lobbyId } = useParams();

    //console.log("lobbyId is:", lobbyId);

    useEffect(() => {

        let timeoutId;

        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData(id) {

            try {
                const config = {Authorization: localStorage.getItem("lobbyToken")};

                // get lobby info
                const getLobbyResponse = await api.get(`/lobbies/${id}`, {headers: config});
                const lobbyData = getLobbyResponse.data;

                setLobby(lobbyData);

                //console.log("lobby ", lobby);

                // set the userIdList to an array of longs consisting of all the user IDs in the lobby
                let userIdList = lobbyData.players;

                //console.log("owner id: ", userIdList[0]);
                //console.log("local u_id: ", localStorage.getItem("user_id"));

                setLobbyOwnerId(userIdList[0]);

                const requestBody = JSON.stringify({ userIdList });

                // get a list of the users according to the userIdList
                const getUsersResponse = await api.post("/users/lobbies", requestBody);

                setUsers(getUsersResponse.data);

                //const getOwnerResponse = await api.get("/users/" + userIdList[0], {headers: config})
                //const userData = getOwnerResponse.data;

                //console.log("response: ", userData);

                //setLobbyOwnerName(userData.username);

                //console.log("owner name: ", lobbyOwnerName) //this shows null, but it isn't null

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
            }, 2000);
        }

        // Initial fetch
        if (lobbyId) {
            debouncedFetchData(lobbyId);
        }

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);


    }, [lobby]); // <-- add lobbyOwnerName again if needed as dependency

    const enterProfile = (id) => {
        navigate("/users/"+id);
    }

    const leaveLobby = async () => {
        try {
            //const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
            const requestBody = JSON.stringify({ "players" : [localStorage.getItem("user_id")] } );
            const response1 = await api.put("/lobbies/" + lobbyId + "/remove", requestBody);
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

    let timer = null;
    var starting = false;

    // Function to start the countdown timer
    const startCountdown = () => {
        timer = 5; // Set initial timer value
        var startGame = setInterval(function() {
            console.log("Countdown: ", timer);
            console.log("starting2: ", startingGame);
            starting = checkStarting();
            if (timer <= 0) {
                clearInterval(startGame);
                if (starting) {
                    navigate("/game");
                }
            } else if (!starting || !timer) {
                console.log("Countdown Stopped!")
                clearInterval(startGame);
                return;
            }
            timer -= 1; // Decrease the timer value
        }, 1000);

        function checkStarting(){
            starting = startingGame;
            return starting;
        }
    }

    // Function to stop the countdown timer
    function stopCountdown() {
        starting = false;
        clearInterval(timer); // Stop the interval
        timer = null; // Reset the timer variable
        console.log("timer: ", timer);
    }

    const gameStart = () => {
        starting = true;
        setStartingGame(true);
        console.log("starting: ", startingGame)
        //startCountdown();
    }

    const cancelGameStart = () => {
        starting = false;
        setStartingGame(false);
        console.log("starting: ", startingGame)
        //stopCountdown();
    }

    useEffect(() => {
        if (startingGame){
            startCountdown(); // Start the countdown for the new game
        }
        else {
            stopCountdown();
        }
        console.log("starting: ", startingGame);
    }, [startingGame]);

    const Player = ({ user }: { user: User }) => (
      <div className="lobby-player container" > {/*onClick={() => enterProfile(user.id)} put this back in in case we need it*/}
          <div className="lobby-player username">{user.username}</div>
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
              {(lobbyOwnerId === parseInt(localStorage.getItem("user_id")) && !startingGame) ?
                (
                  <Button width="100%" style={{ marginBottom: '10px' }}  onClick={gameStart}>
                      Start Game
                  </Button>
                ) : (
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
              <p className="lobby paragraph">
                  Joined users:
              </p>
              {content}
          </BaseContainer>
      </div>
    );
};

export default LobbyScreen;