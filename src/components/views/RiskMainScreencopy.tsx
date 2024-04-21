/*
import React, { useState } from 'react';
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import AttackModal from "../ui/AttackModal";
import BaseContainer from "../ui/BaseContainer";

const TitleScreen: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({
        territory_def: "Add territory name here",
        territory_atk: "Add territory name here",
    });

    const openModal = (content) => {
        setIsModalOpen(true);
        setModalContent(JSON.parse(content));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const territory_def = "Add defending territory name here";
    const territory_atk = "Add attacking territory name here";

    const cont = JSON.stringify({territory_def, territory_atk});

    return (
        <div className="basescreen title-screen">
            <div className="basescreen overlay"></div>
            <BaseContainer>
                <div className="basescreen form">
                    <div className="basescreen title">Risk: Global Domination</div>
                    <div className="basescreen buttons-container" style={{gap: '30px'}}>
                        <Button
                            width="100%" onClick={() => openModal(cont)}>
                            ModalTest
                        </Button>
                        <section>
                            <AttackModal
                            isModalOpen={isModalOpen}
                            modalContent={modalContent}
                            onClose={closeModal}
                            />
                        </section>
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

export default TitleScreen;*/
