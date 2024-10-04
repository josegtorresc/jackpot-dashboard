import React from 'react';
import { motion } from 'framer-motion';
import '../styles/popupDetailValues.css';

function PopupDetailValues({ title, text, img, onClose }) {
  return (
    <div className="container-general-popup-content-poup-detail-values">
      <motion.div
        className="popup-container"
        initial={{ y: '100%' }}
        animate={{ y: '50%' }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="popup-content">
          <img src={img} alt={title} className="popup-image" />
          <h2>{title}</h2>
          <p>{text}</p>
          <button onClick={onClose} className="close-button">
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PopupDetailValues;
