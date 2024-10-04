import React, { useContext } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';
import '../styles/cardPopupDetailMaquinas.css';

const CardPopupDetailCompUsers = ({
  usuario,
  closePopupDetail,
  active,
  onDeactivate,
}) => {
  const { addNotification } = useContext(NotificationContext);

  const handleDeactivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/deactivateUsuario/${usuario.id}`,
      );
      onDeactivate(usuario.id);
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
            Detalle del Usuario
          </h1>
        </div>

        <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
          <div className="row-popup-mobile-jackpot">
            <h1 className="title-row-mobile-jackpot">Nombre</h1>
            <p className="text-row-mobile-jackpot">{usuario.name}</p>
          </div>
          <div className="row-popup-mobile-jackpot">
            <h1 className="title-row-mobile-jackpot">Rol</h1>
            <p className="text-row-mobile-jackpot">{usuario.role}</p>
          </div>
          <div className="row-popup-mobile-jackpot">
            <h1 className="title-row-mobile-jackpot">Permisos</h1>
            <p className="text-row-mobile-jackpot">{usuario.permissions}</p>
          </div>

          <button className="btn-deactivate-jackpot" onClick={handleDeactivate}>
            Dar de baja
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPopupDetailCompUsers;
