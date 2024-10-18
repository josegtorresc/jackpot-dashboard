import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { NotificationContext } from '../services/NotificationContext';
import { RingLoader } from 'react-spinners';

function CardPopupPlayersLevels({ active, closePopupDetail, showBannerSuccess }) {
  const { addNotification } = useContext(NotificationContext);
  const [levels, setLevels] = useState([]);
  const [newLevel, setNewLevel] = useState('');
  const [editedLevel, setEditedLevel] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jackpot-backend.vercel.app/api/levels');
      setLevels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los niveles:', error);
    }
  };

  const handleCreateLevel = async () => {
    if (!newLevel.trim()) {
      console.error('El nombre del nivel es requerido');
      return;
    }
  
    try {
      const response = await axios.post('https://jackpot-backend.vercel.app/api/levels', { nivel: newLevel });
      const createdLevel = response.data;
  
      if (createdLevel && createdLevel.nivel) {
        setLevels(prevLevels => [...prevLevels, createdLevel]);
  
        setNewLevel(''); 
        showBannerSuccess();
        addNotification({
          text: `Nivel creado: ${createdLevel.nivel}`,
          date: new Date().toLocaleString(),
        });
      } else {
        console.error('El nivel creado no tiene un valor válido');
      }
    } catch (error) {
      console.error('Error al crear el nivel:', error);
    }
  };
  
  
  

  const handleEditLevel = async () => {
    if (!selectedLevel) return;

    try {
      await axios.put(`https://jackpot-backend.vercel.app/api/levels/${selectedLevel.id}`, { nivel: editedLevel });
      setEditedLevel('');
      setSelectedLevel(null);
      fetchLevels();
      setStep(1);  
      showBannerSuccess();
    } catch (error) {
      console.error('Error al editar el nivel:', error);
    }
  };

  const handleDeleteLevel = async (levelId) => {
    try {
      await axios.delete(`https://jackpot-backend.vercel.app/api/levels/${levelId}`);
      fetchLevels();
      setStep(1); 
      showBannerSuccess();
    } catch (error) {
      console.error('Error al eliminar el nivel:', error);
    }
  };

  const handleToggleLevelStatus = async (level) => {
    try {
      const newStatus = level.status === 'Active' ? 'Inactive' : 'Active';
      await axios.post(
        `https://jackpot-backend.vercel.app/api/${newStatus === 'Active' ? 'activate' : 'deactivate'}Level/${level.id}`
      );
      fetchLevels();
      showBannerSuccess();
    } catch (error) {
      console.error('Error al cambiar el estado del nivel:', error);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(1);
      setSelectedLevel(null);
      setEditedLevel('');
    }
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setStep(2); 
  };

 
  const filteredLevels = levels.filter(level => {
    return level?.nivel && typeof level.nivel === 'string' && level.nivel.toLowerCase().includes(newLevel.toLowerCase());
  });
  
  
  

  const renderStepContent = () => {
    switch (step) {
      case 1: 
        return (
          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            <motion.div
              className="container-jackpot-selection-amount"
              onClick={() => setStep(4)} 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                className="img-jackpot-selection-amount"
                src={require('../images/conf.png')}
                alt="Crear Nivel"
              />
              <h1 className="text-jackpot-selection-amount">Crear Nivel</h1>
            </motion.div>

            {loading ? (
              <RingLoader color={'orange'} size={30} />
            ) : (
              
              filteredLevels.length > 0 ? (
                filteredLevels.map((level) => (
                  <motion.div
                    key={level.id}
                    className="container-jackpot-selection-amount"
                    onClick={() => handleLevelClick(level)} 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      className="img-jackpot-selection-amount"
                      src={require('../images/mon.png')}
                      alt="player"
                    />
                    <h1 className='text-jackpot-selection-amount'>{level?.nivel}</h1>
                    <p className='amount-jackpot-selection-amount'>{level?.status === 'Active' ? 'Activo' : 'Inactivo'}</p>
                  </motion.div>
                ))
              ) : (
                <p>No hay niveles disponibles</p>
              )
            )}
          </div>
        );

      case 2: 
        return (
          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
               <motion.div
                  className="container-jackpot-selection-amount"
                  onClick={() => setStep(3)}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    className="img-jackpot-selection-amount"
                    src={require('../images/conf.png')}
                    alt="Configuración de niveles"
                  />
                  <h1 className="text-jackpot-selection-amount">
                  Editar Nivel
                  </h1>
                </motion.div>

                <motion.div
                  className="container-jackpot-selection-amount"
                  onClick={() => handleDeleteLevel(selectedLevel.id)}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    className="img-jackpot-selection-amount"
                    src={require('../images/conf.png')}
                    alt="Configuración de niveles"
                  />
                  <h1 className="text-jackpot-selection-amount">
                  Eliminar Nivel
                  </h1>
                </motion.div>

                <motion.div
                  className="container-jackpot-selection-amount"
                  onClick={() => handleToggleLevelStatus(selectedLevel)}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    className="img-jackpot-selection-amount"
                    src={require('../images/conf.png')}
                    alt="Configuración de niveles"
                  />
                  <h1 className="text-jackpot-selection-amount">
                  {selectedLevel?.status === 'Active' ? 'Desactivar Nivel' : 'Activar Nivel'}
                  </h1>
                </motion.div>

          </div>
        );

      case 3: 
        return (
          <div className="card-inside-popup-jackpot-web-levels">
            <h2>Editar Nivel: {selectedLevel?.nivel}</h2>
            <input
              className="input-create-level"
              type="text"
              placeholder="Editar Nivel"
              value={editedLevel}
              onChange={(e) => setEditedLevel(e.target.value)}
            />
            <button className="btn-abm-card-jackpots" onClick={handleEditLevel}>
              Guardar Cambios
            </button>
          </div>
        );

        case 4: 
        return (
          <div className="card-inside-popup-jackpot-web-levels">
          <h2>Crear Nuevo Nivel</h2>
          <input
            className="input-create-level"
            type="text"
            placeholder="Nombre del nuevo nivel"
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
          />
          <button className="btn-abm-card-jackpots" onClick={handleCreateLevel}>
            Guardar Nivel
          </button>
        </div>
        );


      default:
        return null;
    }
  };

  return (
    <Fragment>
      <div className={`container-items-popup-detail-show ${active ? '' : 'container-items-popup-detail'}`}>
        <div className="card-popup-detail">
          {step > 1 && (
            <img
              src={require('../images/back-white.png')}
              className="back-arrow"
              onClick={handlePreviousStep}
              alt="atras"
            />
          )}
          <img
            className="img-close-popup-deatil"
            src={require('../images/close-white.png')}
            alt="close"
            onClick={closePopupDetail}
          />
          <div className="banner-color-popup-detail">
            <h1 className="title-banner-color-popup-detail">Gestión de Niveles de Jugadores</h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {renderStepContent()}
          </motion.div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardPopupPlayersLevels;
