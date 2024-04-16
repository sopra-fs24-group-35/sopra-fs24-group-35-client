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
                            Cards
                        </Button>
                        {/* <div id="id01" className="modal">
                            <span onClick="document.getElementById('id01').style.display='none'"
                            className="close" title="Close Modal">&times;</span>
                            <form className="modal-content animate" action="/action_page.php">
                                <div className="container" style="background-color:#f1f1f1">
                                    <button type="button" onClick="document.getElementById('id01').style.display='none'" className="cancelbtn">Cancel</button>
                                </div>
                            </form>
                        </div> */}
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