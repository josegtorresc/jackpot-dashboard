import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { NotificationContext } from '../services/NotificationContext';
import { RingLoader } from 'react-spinners';

function CardPopupJackpotsTriggerValues({
  active,
  closePopupDetail,
  showBannerSuccess,
}) {
  const { addNotification } = useContext(NotificationContext);
  const [selectedJackpot, setSelectedJackpot] = useState(null);
  const [jackpots, setJackpots] = useState([]);
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

  const handleJackpotClick = (jackpotId) => {
    const clickedJackpot = jackpots.find((jackpot) => jackpot.id === jackpotId);
    if (clickedJackpot) {
      console.log('Jackpot seleccionado:', clickedJackpot);
      setSelectedJackpot(clickedJackpot);
      setStep(2);
      setFormData({
        monto: clickedJackpot.maxAmount.toString(),
      });
    } else {
      console.error('No se encontró el jackpot con ID:', jackpotId);
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

    console.log(
      'Actualizando trigger para jackpot con ID:',
      selectedJackpot.id,
    );

    try {
      const response = await axios.post(
        `https://jackpot-backend.vercel.app/api/updateJackpotTrigger/${encodeURIComponent(
          selectedJackpot.id,
        )}`,
        {
          triggerAmount: parseFloat(formData.monto),
        },
      );

      console.log('Respuesta del servidor:', response.data);

      const updatedAmountTrigger = formData.monto;
      fetchJackpotAmounts();
      showBannerSuccess();

      const notification = {
        text: `Valor del trigger del jackpot ${selectedJackpot.nombre} actualizado a ($${updatedAmountTrigger})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al actualizar el valor del jackpot:', error);
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
          active ? '' : 'container-items-popup-detail'
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
            onClick={closePopupDetail}
          />
          <div className="banner-color-popup-detail">
            <h1 className="title-banner-color-popup-detail">
              Administración de Triggers
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
                      {jackpot.nombre.toUpperCase()}
                    </h1>
                    <p className="amount-jackpot-selection-amount">
                      {jackpot.amount ? (
                        `Trigger: ${jackpot.maxAmount}`
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
                <div className="card-selected-actualization-jackpot">
                  <div className="card-selected-act-jack-text-espc">
                    {`El valor inicial del jackpot es de $${selectedJackpot.amount}, recuerda ajustar el
                    monto adecuadamente tomando en cuanta el monto con que se
                    inicia `}
                  </div>

                  <h1 className="text-jackpot-selection-amount span-selected-comp">
                    Jackpot ({selectedJackpot ? selectedJackpot.nombre : ''})
                  </h1>
                  <input
                    className="input-row-value-jackpot span-selected-comp"
                    type="text"
                    placeholder={`Nuevo trigger para ${
                      selectedJackpot ? selectedJackpot.nombre : ''
                    }`}
                    name="monto"
                    value={formData.monto}
                    onChange={handleChange}
                  />
                  <button
                    className="btn-row-jackpot-actualization-value span-selected-comp"
                    onClick={updateJackpotValue}
                  >
                    Actualizar trigger
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardPopupJackpotsTriggerValues;
