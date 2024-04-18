import React, { useState } from 'react';
import "styles/views/TitleScreen.scss";
import {Button} from "../ui/Button";
import AttackModal from "../ui/AttackModal";
import BaseContainer from "../ui/BaseContainer";

const TitleScreen: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({
        title: "Buy",
        image: "https://res.cloudinary.com/sohmmie/image/upload/v1687376677/buy-icon_ybpo3h.png",
        content: "We appreciate your selection of this item! The 'Buy Now' button will take you only one step closer to receiving all of the wonderful features and advantages it has to offer. Enjoy your shopping!",
        buttonText: "Buy Now"
    });

    const openModal = (content) => {
        setIsModalOpen(true);
        setModalContent(JSON.parse(content));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const title = "Attacking";
    const image = "https://res.cloudinary.com/sohmmie/image/upload/v1687376677/buy-icon_ybpo3h.png";
    const content = "Add players here"
    const buttonText = "Attack";

    const cont = JSON.stringify({title, image, content, buttonText});

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

export default TitleScreen;