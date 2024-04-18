import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GameGuard} from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Login from "../../views/Login";
import {RegistrationGuard} from "../routeProtectors/RegistrationGuard";
import Registration from "../../views/Registration";
import UserProfile from "../../views/UserProfile";
import LobbyErstellen from "../../views/LobbyErstellen";
import RiskMainScreen from "../../views/RiskMainScreen";
import JoinScreen from "../../views/joinScreen";
import LobbyScreen from "../../views/LobbyScreen";
import AvatarPage from "../../views/AvatarPage";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial 
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/game/*" element={<GameGuard />}>
          <Route path="/game/*" element={<GameRouter base="/game"/>} />
        </Route>

        <Route path="/risk/:gameId" element={<GameGuard />}>
          <Route path="/risk/:gameId" element={<RiskMainScreen/>} />
        </Route>

        <Route path="/avatar" element={<GameGuard />}>
          <Route path="/avatar" element={<AvatarPage/>} />
        </Route>

        <Route path="/login" element={<LoginGuard />}>
          <Route path="/login" element={<Login/>} />
        </Route>
        
        <Route path="/registration" element={<RegistrationGuard />}>
          <Route path="/registration" element={<Registration/>} />
        </Route>

        <Route path="/users/:id" element={<GameGuard />}>
          <Route path="/users/:id" element={<UserProfile />} />
        </Route>

        <Route path="/lobby" element={<GameGuard />}>
          <Route path="/lobby" element={<LobbyErstellen />} />
        </Route>

        <Route path="/join" element={<GameGuard />}>
          <Route path="/join" element={<JoinScreen/>} />
        </Route>


        <Route path="/lobby/:lobbyId" element={<GameGuard />}>
          <Route path="/lobby/:lobbyId" element={<LobbyScreen />} />
        </Route>
        
        <Route path="/" element={
          <Navigate to="/game" replace />
        }/>

      </Routes>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
