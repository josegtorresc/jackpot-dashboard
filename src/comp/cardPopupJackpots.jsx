import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';

function CardPopupJackpots({ active, closePopupDetail, showBannerSuccess }) {
  const { addNotification } = useContext(NotificationContext);
  const [newValues, setNewValues] = useState({
    oro: '',
    plata: '',
    bronce: '',
  });

  useEffect(() => {
    const interval = setInterval(fetchJackpotValues, 100);

    return () => clearInterval(interval);
  }, []);

  const fetchJackpotValues = async () => {
    try {
      const response = await axios.get(
        'https://jackpot-backend.vercel.app/api/jackpot/all',
      );
      const { oro, plata, bronce } = response.data;
      setNewValues({ oro, plata, bronce });
    } catch (error) {
      console.error('Error al obtener los valores del jackpot:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewValues({ ...newValues, [name]: value });
  };

  const updateJackpotValues = async () => {
    showBannerSuccess();
    try {
      await axios.post(
        'https://jackpot-backend.vercel.app/api/updateJackpots',
        newValues,
      );
      fetchJackpotAmounts();
      closePopupDetail();

      const notification = {
        text: 'Valores del jackpot actualizados',
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al actualizar los valores del jackpot:', error);
    }
  };

  const [jackpotsValues, setJackpotsValues] = useState({
    oro: '',
    plata: '',
    bronce: '',
  });

  useEffect(() => {
    const interval = setInterval(fetchJackpotAmounts, 100);

    return () => clearInterval(interval);
  }, []);

  const fetchJackpotAmounts = async () => {
    try {
      const responseOro = await axios.get(
        'https://apibackjackpots-44d7136b9d3d.herokuapp.com/api/jackpot/oro',
      );
      const responsePlata = await axios.get(
        'https://apibackjackpots-44d7136b9d3d.herokuapp.com/api/jackpot/plata',
      );
      const responseBronce = await axios.get(
        'https://apibackjackpots-44d7136b9d3d.herokuapp.com/api/jackpot/bronce',
      );

      setJackpotsValues({
        oro: responseOro.data.jackpotAmount,
        plata: responsePlata.data.jackpotAmount,
        bronce: responseBronce.data.jackpotAmount,
      });
    } catch (error) {
      console.error('Error al obtener los montos de los jackpots:', error);
    }
  };

  return (
    <Fragment>
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
              Administración de montos
            </h1>
          </div>

          <div className="card-inside-popup-jackpot-web">
            <div className="row-jackpot-value">
              <h1 className="title-jackpot-row-value">Jackpot oro</h1>
              <input
                className="input-row-value-jackpot"
                type="text"
                name="oro"
                placeholder="Jackpot oro"
                value={newValues.oro}
                onChange={handleChange}
              />
            </div>
            <div className="row-jackpot-value">
              <h1 className="title-jackpot-row-value">Jackpot plata</h1>
              <input
                className="input-row-value-jackpot"
                type="text"
                name="plata"
                placeholder="Jackpot plata"
                value={newValues.plata}
                onChange={handleChange}
              />
            </div>
            <div className="row-jackpot-value">
              <h1 className="title-jackpot-row-value">Jackpot bronce</h1>
              <input
                className="input-row-value-jackpot"
                type="text"
                name="bronce"
                placeholder="Jackpot bronce"
                value={newValues.bronce}
                onChange={handleChange}
              />
            </div>

            <div className="row-jackpot-value">
              <button
                className="btn-row-jackpot-actualization-value"
                onClick={updateJackpotValues}
              >
                Actualizar valores
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardPopupJackpots;
