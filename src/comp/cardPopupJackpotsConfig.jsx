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
  
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/updateJackpotLevels/${selectedJackpot.id}`,
        {
          allowedLevels: selectedLevels, 
        },
      );
  
      showBannerSuccessConfig(true);
      addNotification({
        text: `Niveles del ${selectedJackpot.title} actualizados: ${selectedLevels.join(', ')}`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      });
    } catch (error) {
      console.error('Error al actualizar los niveles del jackpot:', error);
    }
  };

  const handleJackpotClick = (jackpotId) => {
    const clickedJackpot = jackpots.find((jackpot) => jackpot.id === jackpotId);
    if (clickedJackpot) {
      setSelectedJackpot(clickedJackpot);
      setStep(2);
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

          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts ">
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
                  Establecer
                </button>
              </Fragment>
            )}

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardPopupJackpotsConfig;
