import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../styles/cardPopupJackpotsConfig.css';
import { NotificationContext } from '../services/NotificationContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { RingLoader } from 'react-spinners';

function CardPopupJackpotsConfig({
  activeConfig,
  closePopupDetailConfig,
  showBannerSuccessConfig,
  closePopupDetail,
  showBannerSuccess,
}) {
  const [checkboxState, setCheckboxState] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const [allowedLevels, setAllowedLevels] = useState({
    oro: false,
    plata: false,
    bronce: false,
    inicial: false,
  });

  const handleLevelChange = (event) => {
    const { name, checked } = event.target;
    setAllowedLevels({ ...allowedLevels, [name]: checked });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxState({ ...checkboxState, [name]: checked });
  };
  const [currentAllowedLevels, setCurrentAllowedLevels] = useState([]);
  const { addNotification } = useContext(NotificationContext);
  const [selectedJackpot, setSelectedJackpot] = useState(null);
  const [selectedConfigs, setSelectedConfigs] = useState([]);
  const [jackpots, setJackpots] = useState([
    { id: 'oro', title: 'Jackpot Oro', amount: '', triggerAmount: '' },
    { id: 'plata', title: 'Jackpot Plata', amount: '', triggerAmount: '' },
    { id: 'bronce', title: 'Jackpot Bronce', amount: '', triggerAmount: '' },
  ]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    monto: '',
  });
  const [betAmount, setBetAmount] = useState(0); 
const [percentage, setPercentage] = useState(0); 
const [minBet, setMinBet] = useState(0); 
const [maxBet, setMaxBet] = useState(0);
  

  useEffect(() => {
    fetchJackpotAmounts();
  }, []);

  const fetchJackpotAmounts = async () => {
    try {
      const response = await axios.get(
        'https://jackpot-backend.vercel.app/api/alljackpotscreated',
      );
      setJackpots(response.data.filter((jackpot) => jackpot.active));
    } catch (error) {
      console.error('Error al obtener los montos de los jackpots:', error);
    }
  };

  const handleClickConfig = (configId) => {
    setSelectedConfigs((prevSelectedConfigs) =>
      prevSelectedConfigs.includes(configId)
        ? prevSelectedConfigs.filter((id) => id !== configId)
        : [...prevSelectedConfigs, configId],
    );
  };

  const handleClickConfigSend = async () => {
    if (!selectedJackpot) return;
  
    const selectedLevels = Object.keys(allowedLevels).filter(
      (level) => allowedLevels[level]
    );
  
    const configData = {
      allowedLevels: selectedLevels,
      minBet: isNaN(minBet) ? selectedJackpot.minBet : minBet,
      maxBet: isNaN(maxBet) ? selectedJackpot.maxBet : maxBet,
      betPercentage: isNaN(percentage) ? selectedJackpot.betPercentage : percentage,
    };
  
    try {
      await axios.post(
        `http://localhost:5000/api/updateJackpotLevels/${selectedJackpot.id}`,
        configData
      );
  
      showBannerSuccessConfig(true);
      addNotification({
        text: `Configuraciones del ${selectedJackpot.title} actualizadas`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      });
    } catch (error) {
      console.error('Error al actualizar las configuraciones del jackpot:', error);
    }
  };
  

  const handleJackpotClick = async (jackpotId) => {
    const clickedJackpot = jackpots.find((jackpot) => jackpot.id === jackpotId);
    console.log('Jackpot clickeado:', clickedJackpot);
    if (clickedJackpot) {
      setSelectedJackpot(clickedJackpot);
      setStep(2);
  
      try {
        const encodedId = encodeURIComponent(jackpotId);
        const response = await axios.get(
         `https://jackpot-backend.vercel.app/api/jackpot/${encodedId}`,
        );
        const jackpotData = response.data;
        setCurrentAllowedLevels(jackpotData.allowedLevels || []);
        setAllowedLevels({
          oro: jackpotData.allowedLevels.includes('oro'),
          plata: jackpotData.allowedLevels.includes('plata'),
          bronce: jackpotData.allowedLevels.includes('bronce'),
          inicial: jackpotData.allowedLevels.includes('inicial'),
        });
        setSelectedJackpot({
          ...clickedJackpot,
          ...jackpotData, 
        });
      } catch (error) {
        console.error('Error al obtener los detalles del jackpot:', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateJackpotValue = async () => {
    if (!selectedJackpot || !formData.monto) return;

    showBannerSuccess();
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/updateJackpotTrigger/${selectedJackpot.id}`,
        {
          triggerAmount: formData.monto,
        },
      );

      fetchJackpotAmounts();
      closePopupDetail();

      const notification = {
        text: `Trigger del ${selectedJackpot.title} actualizado`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al actualizar el trigger del jackpot:', error);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
    setSelectedJackpot(null);
  };



const handleViewDetails = () => {
  if (!selectedJackpot) return;
  setStep(6); 
};

const renderJackpotDetails = () => (
  <Fragment>
    <img
      src={require('../images/back-white.png')}
      className="back-arrow"
      onClick={() => setStep(2)} 
      alt="atras"
    />
    <div className="card-selected-act-jack-text-espc">
      {`Detalles del jackpot: ${selectedJackpot.nombre}`}
    </div>
    <div className="jackpot-details">
      <p><strong>Monto actual:</strong> {selectedJackpot.amount}</p>
      <p><strong>Porcentaje de apuesta:</strong> {selectedJackpot.betPercentage}%</p>
      <p><strong>Apuesta mínima:</strong> {selectedJackpot.minBet}</p>
      <p><strong>Apuesta máxima:</strong> {selectedJackpot.maxBet}</p>
      <p><strong>Contribuciones:</strong> {selectedJackpot.contributions}</p>
      <p><strong>Máximo Monto:</strong> {selectedJackpot.monto}</p>
      <p><strong>Niveles Permitidos:</strong> {selectedJackpot.allowedLevels.join(', ')}</p>
    </div>
  </Fragment>
);


  return (
    <Fragment>
      <div
        className={`container-items-popup-detail-show ${
          activeConfig ? '' : 'container-items-popup-detail'
        }`}
      >
        <div className="card-popup-detail">
          {step === 2 && (
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
            onClick={closePopupDetailConfig}
          />
          <div className="banner-color-popup-detail">
            <h1 className="title-banner-color-popup-detail">
              Administración de Configuraciones
            </h1>
          </div>

          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            {step === 1 && (
              <Fragment>
                {jackpots.map((jackpot) => (
                  <motion.div
                    key={jackpot.id}
                    className={`container-jackpot-selection-amount ${
                      jackpot.active ? 'active' : ''
                    }`}
                    onClick={() => handleJackpotClick(jackpot.id)}
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img
                      className="img-jackpot-selection-amount"
                      src={require('../images/mon.png')}
                      alt="moneda"
                    />
                    <h1 className="text-jackpot-selection-amount">
                      {jackpot.nombre}
                    </h1>
                    <p className="amount-jackpot-selection-amount">
                      {jackpot.amount ? (
                        `Monto: ${jackpot.amount}`
                      ) : (
                        <RingLoader color={'orange'} size={30} />
                      )}
                    </p>
                  </motion.div>
                ))}
              </Fragment>
            )}

            {step === 2 && (
              <Fragment>
                <div className="card-selected-act-jack-text-espc">
                  {`Las configuraciones serán específicas para cada jackpot, definiendo el comportamiento en un contexto determinado.`}
                </div>

              

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
                    Establecer Niveles
                  </h1>
                </motion.div>
                <motion.div
                  className="container-jackpot-selection-amount"
                  onClick={() => setStep(4)}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    className="img-jackpot-selection-amount"
                    src={require('../images/conf.png')}
                    alt="Configuración de niveles"
                  />
                  <h1 className="text-jackpot-selection-amount">
                    Establecer Apuestas
                  </h1>
                </motion.div>
                <motion.div
                  className="container-jackpot-selection-amount"
                  onClick={() => setStep(5)}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    className="img-jackpot-selection-amount"
                    src={require('../images/conf.png')}
                    alt="Configuración de niveles"
                  />
                  <h1 className="text-jackpot-selection-amount">
                    Establecer Porcentajes
                  </h1>
                </motion.div>

              <motion.div
                className="container-jackpot-selection-amount"
                onClick={handleViewDetails}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img
                  className="img-jackpot-selection-amount"
                  src={require('../images/conf.png')}
                  alt="Ver detalles"
                />
                <h1 className="text-jackpot-selection-amount">
                  Ver detalles
                </h1>
              </motion.div>
              </Fragment>
            )}


            {step === 3 && (
              <Fragment>
                <img
                  src={require('../images/back-white.png')}
                  className="back-arrow"
                  onClick={() => setStep(2)}
                  alt="atras"
                />
                <div className="card-selected-act-jack-text-espc">
                  {`Configuración de niveles para el jackpot seleccionado: ${selectedJackpot.nombre}`}
                </div>

                <div className="current-allowed-levels">
                  <p>
                    <strong>Niveles actuales permitidos:</strong>{' '}
                    {currentAllowedLevels.length > 0
                      ? currentAllowedLevels.join(', ')
                      : 'No hay niveles configurados'}
                  </p>
                </div>

                {['oro', 'plata', 'bronce', 'inicial'].map((level) => (
                  <div key={level}>
                    <label>
                      <input
                        type="checkbox"
                        name={level}
                        checked={allowedLevels[level]}
                        onChange={handleLevelChange}
                      />
                      {`Nivel ${level.charAt(0).toUpperCase() + level.slice(1)}`}
                    </label>
                  </div>
                ))}

                <button
                  className="btn-config-abm-jackpots"
                  onClick={handleClickConfigSend}
                >
                  Confirmar Configuración
                </button>
              </Fragment>
            )}


              {step === 4 && (
                <Fragment>
                  <img
                    src={require('../images/back-white.png')}
                    className="back-arrow"
                    onClick={() => setStep(2)} 
                    alt="atras"
                  />
                  <div className="card-selected-act-jack-text-espc">
                    {`Configuración de apuestas para el jackpot: ${selectedJackpot.nombre}`}
                  </div>

                  <div className="bet-adjustment">
                    <label>Apuesta Mínima:</label>
                    <button className='btn-bet-jackpots-config' onClick={() => setMinBet((prev) => Math.max(0, prev - 1))}>
                      -
                    </button>
                    <input
                      type="number"
                      className='input-bet-jackpots-config'
                      value={minBet}
                      onChange={(e) => setMinBet(Math.max(0, parseFloat(e.target.value)))}
                    />
                    <button className='btn-bet-jackpots-config' onClick={() => setMinBet((prev) => prev + 1)}>
                      +
                    </button>
                  </div>

                  <div className="bet-adjustment">
                    <label>Apuesta Máxima:</label>
                    <button className='btn-bet-jackpots-config' onClick={() => setMaxBet((prev) => Math.max(0, prev - 1))}>
                      -
                    </button>
                    <input
                      type="number"
                      className='input-bet-jackpots-config'
                      value={maxBet}
                      onChange={(e) => setMaxBet(Math.max(0, parseFloat(e.target.value)))}
                    />
                    <button className='btn-bet-jackpots-config' onClick={() => setMaxBet((prev) => prev + 1)}>
                      +
                    </button>
                  </div>

                  <button
                    className="btn-config-abm-jackpots"
                    onClick={handleClickConfigSend}
                  >
                    Confirmar Configuración
                  </button>
                </Fragment>
              )}

                    {step === 5 && (
                      <Fragment>
                        <img
                          src={require('../images/back-white.png')}
                          className="back-arrow"
                          onClick={() => setStep(2)} 
                          alt="atras"
                        />
                        <div className="card-selected-act-jack-text-espc">
                          {`Configuración de porcentajes para el jackpot: ${selectedJackpot.nombre}`}
                        </div>

                        <div className="percentage-adjustment">
                          <button className='btn-bet-jackpots-config' onClick={() => setPercentage((prev) => Math.max(0, prev - 1))}>
                            -
                          </button>
                          <input
                            type="number"
                            className='input-bet-jackpots-config'
                            value={percentage}
                            onChange={(e) => setPercentage(Math.max(0, parseFloat(e.target.value)))}
                          />
                          <button className='btn-bet-jackpots-config' onClick={() => setPercentage((prev) => prev + 1)}>
                            +
                          </button>
                        </div>
                        <button
                          className="btn-config-abm-jackpots"
                          onClick={handleClickConfigSend}
                        >
                          Confirmar Configuración
                        </button>
                      </Fragment>
                    )}

                  {step === 6 && renderJackpotDetails()}


          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardPopupJackpotsConfig;
