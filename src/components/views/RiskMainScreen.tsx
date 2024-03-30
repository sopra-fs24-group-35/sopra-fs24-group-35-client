// TitleScreen.tsx

import React from 'react';
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";

const TitleScreen: React.FC = () => {
    return (
        <div className="basescreen title-screen">
            <div className="basescreen overlay"></div>
            <BaseContainer className="container">
                <div className="basescreen form">
                    <div className="basescreen title-container">
                        Risk: Global Domination
                    </div>
                    <div className="basescreen buttons-container">
                        <Button>Login</Button>
                        <Button>Register</Button>
                    </div>
                </div>
            </BaseContainer>
        </div>
);
}

export default TitleScreen;