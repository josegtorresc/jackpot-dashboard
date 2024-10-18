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
    nombre: jackpot.nombre || '',
    trigger: jackpot.maxAmount || '',
    monto: jackpot.amount || '',
    idAutomatico: jackpot.idAutomatico || '',
    idCasino: jackpot.idCasino || '',
    idMaquina: jackpot.idMaquina || '',
    minBet: jackpot.minBet || '',
    maxBet: jackpot.maxBet || '',
    betPercentage: jackpot.betPercentage || '',
    contributions: jackpot.contributions || '',
    allowedLevels: jackpot.allowedLevels?.join(', ') || '',
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
        { ...formData, allowedLevels: formData.allowedLevels.split(', ') },
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
        <h1 className="title-row-mobile-jackpot">Nombre</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Trigger</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="trigger"
          value={formData.trigger}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Monto</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="monto"
          value={formData.monto}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Apuesta Mínima</h1>
        <input
          className="input-row-mobile-jackpot"
          type="number"
          name="minBet"
          value={formData.minBet}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Apuesta Máxima</h1>
        <input
          className="input-row-mobile-jackpot"
          type="number"
          name="maxBet"
          value={formData.maxBet}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Porcentaje de Apuesta</h1>
        <input
          className="input-row-mobile-jackpot"
          type="number"
          name="betPercentage"
          value={formData.betPercentage}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn-submit-jackpot" onClick={() => openModal('submit')}>
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
              <h1 className="title-row-mobile-jackpot">Identificador</h1>
              <p className="text-row-mobile-jackpot">{formData.idAutomatico}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Nombre</h1>
              <p className="text-row-mobile-jackpot">{formData.nombre}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Trigger</h1>
              <p className="text-row-mobile-jackpot">{formData.trigger}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Monto</h1>
              <p className="text-row-mobile-jackpot">{formData.monto}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Apuesta Mínima</h1>
              <p className="text-row-mobile-jackpot">{formData.minBet}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Apuesta Máxima</h1>
              <p className="text-row-mobile-jackpot">{formData.maxBet}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Porcentaje de Apuesta</h1>
              <p className="text-row-mobile-jackpot">{formData.betPercentage}%</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Contribuciones</h1>
              <p className="text-row-mobile-jackpot">{formData.contributions}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Niveles Permitidos</h1>
              <p className="text-row-mobile-jackpot">{formData.allowedLevels}</p>
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
