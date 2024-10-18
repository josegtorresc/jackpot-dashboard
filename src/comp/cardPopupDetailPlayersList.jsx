import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';
import '../styles/cardPopupDetail.css';
import Modal from 'react-modal';

const CardPopupDetailPlayersList = ({
  player,
  closePopupDetail,
  active,
  onDeactivate,
  onActivate,
  showBannerPlayerUpdated,
}) => {
  const { addNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [levels, setLevels] = useState([]); 

  const [formData, setFormData] = useState({
    username: player?.username || '',
    nivel: player?.nivel || '',
    status: player?.status || '',
    idPlayer: player?.idPlayer || '',
    balance: player?.balance || 0,
  });

  
  useEffect(() => {
    if (player) {
      setFormData({
        username: player.username || '',
        nivel: player.nivel || '',
        status: player.status || '',
        idPlayer: player.idPlayer || '',
        balance: player.balance || 0,
      });
    }

    fetchLevels(); 
  }, [player]);

  const fetchLevels = async () => {
    try {
      const response = await axios.get('https://jackpot-backend.vercel.app/api/levels'); 
      setLevels(response.data); 
    } catch (error) {
      console.error('Error al obtener los niveles:', error);
    }
  };

  const handleDeactivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/desactivatePlayer/${formData.idPlayer}`
      );
      onDeactivate(formData.idPlayer);
      showBannerPlayerUpdated();
      const notification = {
        text: `Se ha desactivado al jugador (${formData.username})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al desactivar el jugador:', error);
    }
  };

  const handleActivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/activatePlayer/${formData.idPlayer}`
      );
      onActivate(formData.idPlayer);
      showBannerPlayerUpdated();
      const notification = {
        text: `Se ha activado al jugador (${formData.username})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al activar el jugador:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://jackpot-backend.vercel.app/api/players/${formData.idPlayer}`,
        { ...formData }
      );
      showBannerPlayerUpdated();
      const notification = {
        text: `Jugador (${formData.username}) actualizado con éxito`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el jugador:', error);
    }
  };

  const handleBalanceUpdate = async () => {
    try {
      await axios.put(
        `https://jackpot-backend.vercel.app/api/players/${formData.idPlayer}/balance`,
        { balance: formData.balance }
      );
      showBannerPlayerUpdated();
      const notification = {
        text: `Balance del jugador (${formData.username}) actualizado con éxito`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al actualizar el balance:', error);
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
    <div className="card-inside-popup-jackpot-web span-players-list">
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Username</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Nivel</h1>
        <select
          className="input-row-mobile-jackpot"
          name="nivel"
          value={formData.nivel}
          onChange={handleInputChange}
        >
          <option value="">Selecciona un nivel</option>
          {levels.map((level) => (
            <option key={level.id} value={level.nivel}>
              {level.nivel}
            </option>
          ))}
        </select>
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Balance</h1>
        <input
          className="input-row-mobile-jackpot"
          type="number"
          name="balance"
          value={formData.balance}
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
            {isEditing ? 'Modificar Jugador' : 'Detalle del Jugador'}
          </h1>
        </div>
        {isEditing ? (
          renderEditForm()
        ) : (
          player && (
            <div className="card-inside-popup-jackpot-web span-players-list">
              <div className="row-popup-mobile-jackpot">
                <h1 className="title-row-mobile-jackpot">ID del Jugador</h1>
                <p className="text-row-mobile-player">{formData.idPlayer}</p>
              </div>
              <div className="row-popup-mobile-jackpot">
                <h1 className="title-row-mobile-jackpot">Username</h1>
                <p className="text-row-mobile-jackpot">{formData.username}</p>
              </div>
              <div className="row-popup-mobile-jackpot">
                <h1 className="title-row-mobile-jackpot">Nivel</h1>
                <p className="text-row-mobile-jackpot">{formData.nivel}</p>
              </div>
              <div className="row-popup-mobile-jackpot">
                <h1 className="title-row-mobile-jackpot">Estado</h1>
                <p className="text-row-mobile-jackpot">{formData.status}</p>
              </div>
              <div className="row-popup-mobile-jackpot">
                <h1 className="title-row-mobile-jackpot">Balance</h1>
                <p className="text-row-mobile-jackpot">{formData.balance}</p>
              </div>
              <button className="btn-edit-jackpot" onClick={() => setIsEditing(true)}>
                Modificar
              </button>
              {player.status === 'Active' ? (
                <button
                  className="btn-deactivate-jackpot"
                  onClick={() => openModal('deactivate')}
                >
                  Desactivar
                </button>
              ) : (
                <button
                  className="btn-activate-jackpot"
                  onClick={() => openModal('activate')}
                >
                  Activar
                </button>
              )}
            </div>
          )
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
            ? 'desactivar'
            : 'activar'}{' '}
          este jugador?
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

export default CardPopupDetailPlayersList;
