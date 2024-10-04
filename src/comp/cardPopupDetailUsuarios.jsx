import React, { useContext, useState } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';
import '../styles/cardPopupDetail.css';
import Modal from 'react-modal';

const CardPopupDetailUsuario = ({
  usuario,
  closePopupDetail,
  onDeactivate,
  onActivate,
  showBannerJackpotCreated,
  active,
}) => {
  const { addNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: usuario.name,
    role: usuario.role,
    permissions: usuario.permissions,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const handleDeactivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/desactivateUsuario/${usuario.idUser}`,
      );
      onDeactivate(usuario.idUser);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha dado de baja un usuario (${usuario.name})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al desactivar el usuario:', error);
    }
  };

  const handleActivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/activateUsuario/${usuario.idUser}`,
      );
      onActivate(usuario.idUser);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha dado de alta un usuario (${usuario.name})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al activar el usuario:', error);
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
        `https://jackpot-backend.vercel.app/api/users/${usuario.idUser}`,
        formData,
      );
      const notification = {
        text: `Usuario (${formData.name}) actualizado con éxito`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      showBannerJackpotCreated();
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const renderEditForm = () => (
    <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Nombre del Usuario</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Rol</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Permisos</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="permissions"
          value={formData.permissions}
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
            {isEditing ? 'Modificar Usuario' : 'Detalle del Usuario'}
          </h1>
        </div>
        {isEditing ? (
          renderEditForm()
        ) : (
          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Id Usuario</h1>
              <p className="text-row-mobile-jackpot">{usuario.idUser}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Nombre del Usuario</h1>
              <p className="text-row-mobile-jackpot">{usuario.name}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Rol</h1>
              <p className="text-row-mobile-jackpot">{usuario.role}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Permisos</h1>
              <p className="text-row-mobile-usuario">{usuario.permissions}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Estado</h1>
              <p className="text-row-mobile-jackpot">{usuario.status}</p>
            </div>

            <button
              className="btn-edit-jackpot"
              onClick={() => setIsEditing(true)}
            >
              Modificar
            </button>
            {usuario.status === 'Inactive' ? (
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

export default CardPopupDetailUsuario;
