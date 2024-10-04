import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/cardPopupJackpotTriggerMobile.css';
import BannerSuccess from '../comp/bannerSuccess';

function CardPopupJackpotTriggerMobile({
  popupJackpotTriggerMobile,
  closePopupJackpotsAct,
}) {
  const [bannerSuccess, setBannerSuccess] = useState(false);

  useEffect(() => {
    let timeout;
    if (bannerSuccess) {
      timeout = setTimeout(() => {
        setBannerSuccess(false);
      }, 3000);
    } else {
      setBannerSuccess(false);
    }

    return () => clearTimeout(timeout);
  }, [bannerSuccess]);

  return (
    <Fragment>
      <BannerSuccess banner={bannerSuccess} title="Jackpot actualizado!!" />
      <div
        className={`container-popup-jackpot-mobile-show ${
          popupJackpotTriggerMobile ? '' : 'container-popup-jackpot-mobile'
        }`}
      >
        <div className="card-popup-jackpot-mobile">
          <img
            className="img-close-poup-est-comp-data"
            src={require('../images/close.png')}
            alt="Cerrar"
            onClick={closePopupJackpotsAct}
          />
          <h1 className="title-general-card-jackpot-mobile">ADM Jackpots</h1>
          <div>
            <input
              className="input-jackpots-mobile"
              type="text"
              name="oro"
              placeholder="Jackpot oro"
            />
          </div>
          <div>
            <input
              className="input-jackpots-mobile"
              type="text"
              name="plata"
              placeholder="Jackpot plata"
            />
          </div>
          <div>
            <input
              className="input-jackpots-mobile"
              type="text"
              name="bronce"
              placeholder="Jackpot bronce"
            />
          </div>
          <div>
            <button className="btn-jackpots-mobile-act">Actualizar</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardPopupJackpotTriggerMobile;
