import React, { Fragment, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/cardAbmCreate.css';
import BannerSuccess from './bannerSuccess';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';

function CardAbmCreatePlayers({ onClosePopupAbm }) {
  const [formData, setFormData] = useState({
    idPlayer: '',
    username: '',
    nivel: '',
  });
  const [levels, setLevels] = useState([]); 
  const [bannerAbm, setBannerAbm] = useState(false);
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get('https://jackpot-backend.vercel.app/api/levels');
        setLevels(response.data); 
      } catch (error) {
        console.error('Error al obtener los niveles:', error);
      }
    };

    fetchLevels(); 
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSetBannerOpen = () => {
    setBannerAbm(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://jackpot-backend.vercel.app/api/players',
        formData
      );
      const notification = {
        text: `Se ha dado de alta un nuevo jugador (${formData.username})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };

      addNotification(notification);
      if (response.status === 201) {
        handleSetBannerOpen();
        console.log(formData);
      }
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  useEffect(() => {
    const newIdPlayer = generateUniqueId();
    setFormData((prevData) => ({
      ...prevData,
      idPlayer: newIdPlayer,
      username: `user_${newIdPlayer}`,
    }));
  }, []);

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="container-extern-abm-create-jackpots">
          <div className="card-abm-create-jackpots">
            <div className="banner-mark-card-abm-create-jackpots">
              <img
                className="close-popup-abm-jackpots"
                src={require('../images/close-white.png')}
                alt="popup"
                onClick={onClosePopupAbm}
              />
              <h1 className="text-banner-mark-card-abm-create-jackpots">
                Dar de alta nuevo jugador
              </h1>
            </div>

            <div className="step-content">
              <div className="container span-container-abm-card-jackpots">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">ID Jugador</h1>
                      <input
                        className="input-abm-card"
                        type="text"
                        placeholder="ID Jugador"
                        name="idPlayer"
                        value={formData.idPlayer}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">Nombre de Usuario</h1>
                      <input
                        className="input-abm-card"
                        type="text"
                        placeholder="Nombre de Usuario"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">Nivel</h1>
                      {/* Aquí mostramos el select de niveles obtenidos de la API */}
                      <select
                        className="input-abm-card"
                        name="nivel"
                        value={formData.nivel}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccione un nivel</option>
                        {levels.map((level) => (
                          <option key={level.id} value={level.nivel}>
                            {level.nivel}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="button-container">
              <button className="btn-abm-card-jackpots" onClick={handleSubmit}>
                Confirmar
              </button>
            </div>
          </div>
        </div>

        <BannerSuccess
          banner={bannerAbm}
          title="¡Jugador creado correctamente!"
        />
      </motion.div>
    </Fragment>
  );
}

export default CardAbmCreatePlayers;
