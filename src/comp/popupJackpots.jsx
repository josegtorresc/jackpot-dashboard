import React, { useEffect, useState } from 'react';
import '../styles/popupJackpots.css';
import { RingLoader } from 'react-spinners';

const Popup = ({ jackpot, onClose, loading }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`popup-overlay ${isVisible ? 'show' : ''}`}>
      <div className={`popup-content ${isVisible ? 'show' : ''}`}>
        <div>
          <img
            className="img-popup-content"
            src={require('../images/mon.png')}
            alt="avatar"
          />
        </div>
        <div>
          <h1 className="title-des-popup-jackpot">Jackpot</h1>
          <h2 className="text-name-popup-jackpot">{jackpot.nombre}</h2>
        </div>
        <div>
          <h1 className="title-des-popup-jackpot">Balance</h1>
          {loading ? (
            <div className="container-card-popup-est-comp">
              <RingLoader color={'orange'} loading={loading} size={50} />
            </div>
          ) : (
            <p className="text-balance-popup">{jackpot.amount} </p>
          )}
        </div>
        <div>
          <h1 className="title-des-popup-jackpot">Trigger</h1>
          {loading ? (
            <div className="container-card-popup-est-comp">
              <RingLoader color={'orange'} loading={loading} size={50} />
            </div>
          ) : (
            <p className="text-balance-popup">{jackpot.maxAmount} </p>
          )}
        </div>
        <img
          className="btn-close-popup-jackpots"
          src={require('../images/close.png')}
          alt=""
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default Popup;
