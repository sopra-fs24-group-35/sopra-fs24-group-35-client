import React from 'react';
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";

const TitleScreen: React.FC = () => {
    return (
        <div className="basescreen title-screen">
            <div className="basescreen overlay"></div>
            <BaseContainer>
                <div className="basescreen form">
                    <div className="basescreen title">Risk: Global Domination</div>
                <div className="basescreen buttons-container" style={{gap: '30px'}}>
                    <Button
                        width="100%">
                        Login
                    </Button>
                    <Button
                        width="100%">
                        Login
                    </Button>
                </div>
                </div>
            </BaseContainer>
        </div>
    );
}

export default TitleScreen;