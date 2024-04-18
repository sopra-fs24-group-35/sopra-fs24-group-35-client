import React, { useEffect, useState } from "react";
import "styles/ui/Modal.scss";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import { User } from "types";

const AttackModal = ({ isModalOpen, modalContent, onClose }) => {
  if (!isModalOpen) {
    return null;
  }

  const [attacker, setAttacker] = useState<User>(null);
  const [defender, setDefender] = useState<User>(null);

  

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content p-lg-4" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <main className="modal-mainContents">
          <div className="modal-info-container">
            <div className="defender-info">
              <h5 className="modal-title">{modalContent.territory_def}</h5>
            </div>
            <div className="attacker-info">
              <h5 className="modal-title">{modalContent.territory_atk}</h5>
            </div>
          </div>
          <hr />
          <div className="modal-image text-center mt-lg-2">
            <img alt="image" />
          </div>
          <p className="mt-lg-3 modalText">{modalContent.territory_atk}</p>
          <div className="modal-button text-end">
            <button>Attack</button>
          </div>
        </main>
      </div>
    </div>
  );
};

AttackModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  modalContent: PropTypes.shape({
    territory_def: PropTypes.string.isRequired,
    territory_atk: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default AttackModal;
