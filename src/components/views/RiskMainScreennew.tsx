//copy to switch back to not push the whole time

import React from 'react';
import "styles/views/TitleScreennew.scss";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
let riskLogo = require("./Risk.png");

const TitleScreen2: React.FC = () => {
    return (
        <div className="basescreen title-screen">
            <div className="basescreen overlay"></div>
            <BaseContainer>
                <div className="basescreen form">
                    <div className="basescreen title">
                        <img src={riskLogo} alt="risk logo" />
                    </div>
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

export default TitleScreen2;