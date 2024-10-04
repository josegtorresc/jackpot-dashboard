import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';
import '../styles/cardPopupDetail.css';
import Modal from 'react-modal';

const CardPopupDetailCasino = ({
  casino,
  closePopupDetail,
  active,
  onDeactivate,
  onActivate,
  showBannerJackpotCreated,
}) => {
  const { addNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    idCasino: casino.idCasino,
    ubicacion: casino.ubicacion,
    pais: casino.pais,
    ciudad: casino.ciudad,
    status: casino.status,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const handleDeactivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/desactivateCasino/${casino.idCasino}`,
      );
      onDeactivate(casino.idCasino);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha dado de baja un casino (${casino.idCasino})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al desactivar el casino:', error);
    }
  };

  const handleActivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/activateCasino/${casino.idCasino}`,
      );
      onActivate(casino.idCasino);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha activado un casino (${casino.idCasino})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al activar el casino:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://jackpot-backend.vercel.app/api/casinos/${casino.idCasino}`,
        formData,
      );
      showBannerJackpotCreated();
      const notification = {
        text: `Casino (${formData.idCasino}) actualizado con éxito`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating casino:', error);
    }
  };

  const renderEditForm = () => (
    <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">ID Casino</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="idCasino"
          value={formData.idCasino}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Ubicación</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">País</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="pais"
          value={formData.pais}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Ciudad</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Estado</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        />
      </div>

      <button className="btn-submit-jackpot" onClick={handleSubmit}>
        Guardar Cambios
      </button>
      <button className="btn-cancel-edit" onClick={() => setIsEditing(false)}>
        Cancelar
      </button>
    </div>
  );

  const openModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmAction = () => {
    if (modalAction === 'submit') {
      handleSubmit();
    } else if (modalAction === 'deactivate') {
      handleDeactivate();
    } else if (modalAction === 'activate') {
      handleActivate();
    }
    closeModal();
  };

  return (
    <div
      className={`container-items-popup-detail-show ${
        active ? '' : 'container-items-popup-detail'
      }`}
    >
      <div className="card-popup-detail">
        <img
          className="img-close-popup-deatil"
          src={require('../images/close-white.png')}
          alt="close"
          onClick={closePopupDetail}
        />
        <div className="banner-color-popup-detail">
          <h1 className="title-banner-color-popup-detail">
            {isEditing ? 'Modificar Casino' : 'Detalle del casino'}
          </h1>
        </div>
        {isEditing ? (
          renderEditForm()
        ) : (
          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Casino</h1>
              <p className="text-row-mobile-jackpot">{casino.idCasino}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Ubicación</h1>
              <p className="text-row-mobile-jackpot">{casino.ubicacion}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">País</h1>
              <p className="text-row-mobile-jackpot">{casino.pais}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Ciudad</h1>
              <p className="text-row-mobile-jackpot">{casino.ciudad}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Estado</h1>
              <p className="text-row-mobile-jackpot">{casino.status}</p>
            </div>
            <button
              className="btn-edit-jackpot"
              onClick={() => setIsEditing(true)}
            >
              Modificar
            </button>
            {casino.status === 'Inactive' ? (
              <button
                className="btn-activate-jackpot"
                onClick={() => openModal('activate')}
              >
                Dar de alta
              </button>
            ) : (
              <button
                className="btn-deactivate-jackpot"
                onClick={() => openModal('deactivate')}
              >
                Dar de baja
              </button>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Action"
      >
        <h2>Confirmar Acción</h2>
        <p>
          ¿Estás seguro de que deseas{' '}
          {modalAction === 'submit'
            ? 'guardar los cambios'
            : modalAction === 'deactivate'
            ? 'dar de baja'
            : 'dar de alta'}{' '}
          este jackpot?
        </p>
        <button className="btn-confirm-overlay" onClick={confirmAction}>
          Confirmar
        </button>
        <button className="btn-cancel-overlay" onClick={closeModal}>
          Cancelar
        </button>
      </Modal>
    </div>
  );
};

export default CardPopupDetailCasino;
