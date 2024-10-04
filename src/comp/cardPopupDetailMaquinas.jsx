import React, { useContext, useState } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';
import '../styles/cardPopupDetail.css';
import Modal from 'react-modal';

const CardPopupDetailMaquinas = ({
  maquina,
  closePopupDetail,
  active,
  onDeactivate,
  onActivate,
  showBannerJackpotCreated,
}) => {
  const { addNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    idGMFriendly: maquina.idGMFriendly,
    idCasino: maquina.idCasino,
    idArea: maquina.idArea,
    fecha: maquina.fecha,
    idGMMAnufacturer: maquina.idGMMAnufacturer,
    baseAccounting: maquina.baseAccounting,
    gmSerialNumber: maquina.gmSerialNumber,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const handleDeactivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/deactivateMaquina/${maquina.idGM}`,
      );
      onDeactivate(maquina.idGM);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha dado de baja una máquina (${maquina.idGMFriendly})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al desactivar la máquina:', error);
    }
  };

  const handleActivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/activateMaquina/${maquina.idGM}`,
      );
      onActivate(maquina.idGM);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha activado una máquina (${maquina.idGMFriendly})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al activar la máquina:', error);
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
        `https://jackpot-backend.vercel.app/api/maquinas/${maquina.idGM}`,
        formData,
      );
      showBannerJackpotCreated();
      const notification = {
        text: `Máquina (${formData.idGMFriendly}) actualizada con éxito`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating maquina:', error);
    }
  };

  const renderEditForm = () => (
    <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">ID GM Friendly</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="idGMFriendly"
          value={formData.idGMFriendly}
          onChange={handleInputChange}
        />
      </div>
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
        <h1 className="title-row-mobile-jackpot">ID Área</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="idArea"
          value={formData.idArea}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Fecha</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="fecha"
          value={formData.fecha}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">ID GM Manufacturer</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="idGMMAnufacturer"
          value={formData.idGMMAnufacturer}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Base Accounting</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="baseAccounting"
          value={formData.baseAccounting}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Número de Serie GM</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="gmSerialNumber"
          value={formData.gmSerialNumber}
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
            {isEditing ? 'Modificar Máquina' : 'Detalle de las maquinas'}
          </h1>
        </div>
        {isEditing ? (
          renderEditForm()
        ) : (
          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID GM</h1>
              <p className="text-row-mobile-jackpot">{maquina.idGM}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">
                ID Maquina (idGMFriendly)
              </h1>
              <p className="text-row-mobile-jackpot">{maquina.idGMFriendly}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Estado</h1>
              <p className="text-row-mobile-jackpot">
                {maquina.active ? 'Activo' : 'Inactivo'}
              </p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Casino</h1>
              <p className="text-row-mobile-jackpot">{maquina.idCasino}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Fecha de alta</h1>
              <p className="text-row-mobile-jackpot">{maquina.fecha}</p>
            </div>
            <button
              className="btn-edit-jackpot"
              onClick={() => setIsEditing(true)}
            >
              Modificar
            </button>
            {maquina.active ? (
              <button
                className="btn-deactivate-jackpot"
                onClick={() => openModal('deactivate')}
              >
                Dar de baja
              </button>
            ) : (
              <button
                className="btn-activate-jackpot"
                onClick={() => openModal('activate')}
              >
                Dar de alta
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

export default CardPopupDetailMaquinas;
