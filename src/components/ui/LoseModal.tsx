import React, { useEffect, useState } from "react";
import "styles/ui/WinLooseModal.scss";
import "styles/views/Login.scss"
import PropTypes from "prop-types";


const LoseModal = ({ isModalOpen, onClose}) => {
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
          <h1>You Lose!</h1>
          <button className="centered-button"
                  onClick={console.log("hallo")}>
            Leave Game
          </button>
        </main>
      </div>
    </div>
  );
};


LoseModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LoseModal;
