import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import {useNavigate, useParams} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/UserProfile.scss";
import User from "models/User";

const FormField = (props) => {
  return (
    <div className="edit field">
      <input
        className="edit input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.value==="password" ? "password" : "text"}
      />
    </div>
  );
};

FormField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

const UserProfile = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User>(null);
  const [isMyProfile, setIsMyProfile] = useState<Boolean>(null);
  const [editMode, setEditMode] = useState<Boolean>(null);
  const [username, setUsername] = useState<String>(null);
  const [birthday, setBirthday] = useState<String>(null);
  useEffect(() => {
    async function gettheUser(id) {
      try {
        const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
        const response = await api.get("/users/"+id, {headers: config});
        
        setUser(new User(response.data));
        setIsMyProfile(localStorage.getItem("user_id") === id);
        setEditMode(false);
      } catch (error) {
        alert(
          `Something went wrong with fetching the user data: \n${handleError(error)}`
        );
      }
    };
    gettheUser(id);
  }, []);

  const enterEditMode = () => {
    setEditMode(true);
  }

  const exitEditMode = async (acceptChanges) => {
    // if user wants to accept changes, ontinue, else just leave edit mode without changes
    if (!acceptChanges) {
      setEditMode(false);

      return;
    }
    // Check if date format is valid
    if (birthday !== null && !isDateValid(birthday) && birthday !== "") {
      console.log("Invalid birthday date");

      return;
    }
    try {
      
      
      const config = {Authorization: localStorage.getItem("token"), User_ID: localStorage.getItem("user_id") };
      // Check if new username is given. If field is empty, keep old username.
      var requestBody;
      if (username === "" || username === null || username === localStorage.getItem("username")) {
        requestBody = JSON.stringify({ birthday });
      } else if (birthday === "" || birthday === null) {
        requestBody = JSON.stringify({ username });
      } else {
        requestBody = JSON.stringify({ username, birthday });
      }
      
      const response = await api.put("/users/"+localStorage.getItem("user_id"), requestBody, {headers: config});
      
      // exit edit mode
      setEditMode(false);
      
      // Get the user and update the user object.
      user.username = username;
      user.birthday = birthday;
      

      // Store the new username and birthday into the local storage.
      if (username !== "" && username !== null) {
        console.log("set username");
        localStorage.setItem("username", username);
      }
      setUsername(localStorage.getItem("username"));

    } catch (error) {
      alert(
        "Something went wrong during the update: \n"+handleError(error)
      );
    }
  }

  const isDateValid = (dateStr) => {
    if (dateStr === "") {
      return;
    }
    const reformat = dateStr.replaceAll("-","/");
    const date = new Date(reformat);
    if (isNaN(date.getTime())) {
      alert(
        "The given date doesn't have the correct format."
      );

      return false;
    }
    
    return true;
  }

  let content = <Spinner />;

  if (user) {
    content = (
      <div>
        <h1>{isMyProfile ? "My Profile" : "User Profile"}</h1>
        <div className = "spec container">
          <p className = "spec description">Username:</p>
          {editMode ? (
            <FormField
              value={username}
              onChange={(un: string) => setUsername(un)}
              placeholder={user.username}
            />
          ) : (
            <h2 className = "spec content">{isMyProfile ? localStorage.getItem("username") : user.username}</h2>
          )}
          
        </div>
        <div className = "spec container">
          <p className = "spec description">Status:</p>
          <h2 className = {user.status === "ONLINE" ? "spec contentOnline" : "spec contentOffline"}>{user.status}</h2>
        </div>
        <div className = "spec container">
          <p className = "spec description">Date Created:</p>
          <h2 className = "spec content">{user.creationDate}</h2>
        </div>
        <div className = "spec container">
          <p className = "spec description">Birthday:</p>
          {editMode ? (
            <FormField
              value={birthday}
              onChange={(un: string) => setBirthday(un)}
              placeholder={user.birthday || "yyyy-mm-dd"}
            />
          ) : ( 
            <h2 className = "spec content">{user.birthday || "unknown"}</h2>
          )}
          
        </div>
        {(isMyProfile && !editMode) ? (
          <Button width="100%" style={{ marginBottom: '10px' }} onClick={() => enterEditMode()}>
          edit profile
          </Button>
        ) : (<></>)}

        {(isMyProfile && editMode) ? (
          <div>
            <Button width="100%" style={{ marginBottom: '10px' }} onClick={() => exitEditMode(true)}>
            Confirm changes
            </Button>
            <Button width="100%" style={{ marginBottom: '10px' }} onClick={() => exitEditMode(false)}>
            Return without changes
            </Button>
          </div> 
        ) : (<></>)}

        {!editMode ? (
          <Button width="100%" style={{ marginBottom: '10px' }} onClick={() => navigate("/game")}>
          back
          </Button>
        ) : (<></>)}
        
        
      </div>
      
    )
  }

  return(
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
    <BaseContainer className="profile container">
      {content}
    </BaseContainer>
    </div>
  )    
}

export default UserProfile;