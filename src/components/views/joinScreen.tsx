import React, { useState } from "react";
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
import FormFieldID from "../ui/FormField";
import { useNavigate } from "react-router-dom";



const joinScreen: React.FC = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>(null);


  return (
    <div className="basescreen title-screen">
      <div className="basescreen overlay"></div>
      <BaseContainer>
        <div className="basescreen form">
          <div className="basescreen buttons-container" style={{ gap: '30px' }}>
            <FormFieldID
              label="Lobby ID"
              value={id}
              onChange={(un: string) => setId(un)}
            />
            <Button
              width="100%"
              key = {id}
              onClick={() => navigate("/lobby/" +id)}
              >
              Confirm
            </Button>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
}

export default joinScreen;