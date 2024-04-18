import React from "react";
import "styles/ui/Modal.scss";
import PropTypes from "prop-types";

const AttackModal = ({ isModalOpen, modalContent, onClose }) => {
  if (!isModalOpen) {
    return null;
  }
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content p-lg-4" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>&times;</button>
        <main className="modal-mainContents">
          <h5 className="modal-title">{modalContent.title}</h5>
          <hr />
          <div className="modal-image text-center mt-lg-2">
            <img src={modalContent.image} alt="image" />
          </div>
          <p className="mt-lg-3 modalText">{modalContent.content}</p>
          <div className="modal-button text-end">
            <button>{modalContent.buttonText}</button>
          </div>
        </main>
      </div>
    </div>
  );
};

AttackModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  modalContent: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default AttackModal;
