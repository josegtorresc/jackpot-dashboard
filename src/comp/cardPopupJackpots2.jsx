import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { NotificationContext } from '../services/NotificationContext';
import BannerSuccess from './bannerSuccess';
import { RingLoader } from 'react-spinners';
import { useUser } from '../services/UserContext';

function CardPopupJackpots2({ active, closePopupDetail, showBannerSuccess }) {
  const { addNotification } = useContext(NotificationContext);
  const [selectedJackpot, setSelectedJackpot] = useState(null);
  const [jackpots, setJackpots] = useState([]);
  const [step, setStep] = useState(1);
  const { user } = useUser();
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

    console.log('Actualizando monto para jackpot con ID:', selectedJackpot.id);

    try {
      const response = await axios.post(
        `https://jackpot-backend.vercel.app/api/updateJackpotAmount/${encodeURIComponent(
          selectedJackpot.id,
        )}`,
        {
          amount: formData.monto,
        },
      );

      console.log('Respuesta del servidor:', response.data);

      const updatedAmount = formData.monto;
      fetchJackpotAmounts();
      showBannerSuccess();

      const notification = {
        text: `Valor del jackpot ${selectedJackpot.nombre} actualizado a ($${updatedAmount})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
        user: {
          name: user.name,
          id: user.id,
        },
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
              Administración de montos
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
                <div className="card-selected-actualization-jackpot">
                  <div className="card-selected-act-jack-text-espc">
                    {`El valor del trigger de este jackpot es de $${selectedJackpot.maxAmount}, recuerda ajustar el
                    monto adecuadamente tomando en cuanta el monto con que se
                    inicia `}
                  </div>
                  <h1 className="text-jackpot-selection-amount span-selected-comp">
                    Jackpot ({selectedJackpot.nombre})
                  </h1>
                  <input
                    className="input-row-value-jackpot span-selected-comp"
                    type="text"
                    placeholder={`Nuevo monto para ${selectedJackpot.nombre}`}
                    name="monto"
                    value={formData.monto}
                    onChange={handleChange}
                  />
                  <button
                    className="btn-row-jackpot-actualization-value span-selected-comp"
                    onClick={updateJackpotValue}
                  >
                    Actualizar valor
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

export default CardPopupJackpots2;
