import React, { useContext, useState } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';
import '../styles/cardPopupDetail.css';
import Modal from 'react-modal';

const CardPopupDetail = ({
  jackpot,
  closePopupDetail,
  active,
  onDeactivate,
  onActivate,
  showBannerJackpotCreated,
}) => {
  const { addNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: jackpot.nombre,
    trigger: jackpot.maxAmount,
    monto: jackpot.amount,
    idAutomatico: jackpot.idAutomatico,
    idCasino: jackpot.idCasino,
    idMaquina: jackpot.idMaquina,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const handleDeactivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/deactivateJackpot/${jackpot.idAutomatico}`,
      );
      onDeactivate(jackpot.idAutomatico);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha dado de baja un jackpot (${jackpot.nombre})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al desactivar el jackpot:', error);
    }
  };

  const handleActivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/activateJackpot/${jackpot.idAutomatico}`,
      );
      onActivate(jackpot.idAutomatico);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha activado un jackpot (${jackpot.nombre})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al activar el jackpot:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://jackpot-backend.vercel.app/api/jackpots/${jackpot.idAutomatico}`,
        formData,
      );
      showBannerJackpotCreated();
      const notification = {
        text: `Jackpot (${formData.nombre}) actualizado con éxito`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating jackpot:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderEditForm = () => (
    <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Nombre del jackpot</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">ID Maquina</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="idMaquina"
          value={formData.idMaquina}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Estado</h1>
        <p className="text-row-mobile-jackpot">
          {jackpot.active ? 'Activo' : 'Inactivo'}
        </p>
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
        <h1 className="title-row-mobile-jackpot">ID Jackpot</h1>
        <p className="text-row-mobile-jackpot">{formData.idAutomatico}</p>
      </div>

      <button
        className="btn-submit-jackpot"
        onClick={() => openModal('submit')}
      >
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
            {isEditing ? 'Modificar Jackpot' : 'Detalle del Jackpot'}
          </h1>
        </div>
        {isEditing ? (
          renderEditForm()
        ) : (
          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Nombre del jackpot</h1>
              <p className="text-row-mobile-jackpot">{jackpot.nombre}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Maquina</h1>
              <p className="text-row-mobile-jackpot">{jackpot.idMaquina}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Estado</h1>
              <p className="text-row-mobile-jackpot">
                {jackpot.active ? 'Activo' : 'Inactivo'}
              </p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Casino</h1>
              <p className="text-row-mobile-jackpot">{jackpot.idCasino}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Jackpot</h1>
              <p className="text-row-mobile-jackpot">{jackpot.idAutomatico}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Monto Inicial</h1>
              <p className="text-row-mobile-jackpot">{jackpot.amount}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Trigger</h1>
              <p className="text-row-mobile-jackpot">{jackpot.maxAmount}</p>
            </div>
            <button
              className="btn-edit-jackpot"
              onClick={() => setIsEditing(true)}
            >
              Modificar
            </button>
            {jackpot.active ? (
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

export default CardPopupDetail;
