import React, { useEffect, useState } from "react";
import "styles/ui/WinLooseModal.scss";
import "styles/views/Login.scss"
import PropTypes from "prop-types";


const LeaveModal = ({ isModalOpen, onClose}) => {
    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content p-lg-4" onClick={e => e.stopPropagation()}>
                <button className="close" onClick={onClose}>
                    &times;
                </button>
                <main className="modal-mainContents">
                    <h1>Do you really want to leave this game?</h1>
                    <button className="centered-button"
                            onClick={console.log("hallo")}>
                        Yes!
                    </button>
                </main>
            </div>
        </div>
    );
};


LeaveModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default LeaveModal;