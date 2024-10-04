import React from 'react';
import '../styles/modal.css';

function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="card-aside-inside-not span-modal-content">
        <div className="col-inside">
          <img
            className="img-icon-card-inside"
            src={content.img}
            alt="moneda"
          />
        </div>
        <div className="col-inside">
          <h1 className="title-not-inside"> {content.title} </h1>
          <p
            dangerouslySetInnerHTML={{ __html: content.text }}
            className="text-not-inside"
          ></p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
