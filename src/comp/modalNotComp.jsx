import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/modal.css';

const ModalNotComp = ({ children, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`modal-overlay ${isVisible ? 'show' : ''}`}>
      <div
        className={`modal-content ${isVisible ? 'show' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="modal-close-button-img-not-comp"
          src={require('../images/close.png')}
          alt="close"
          onClick={handleClose}
        />
        {children}
      </div>
    </div>
  );
};

ModalNotComp.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalNotComp;
