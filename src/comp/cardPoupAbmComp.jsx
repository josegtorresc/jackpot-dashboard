import React from 'react';
import { Fragment } from 'react';
import '../styles/cardPopupEstComp.css';

function CardPopupAbmComp({ popupDetail, closePopupDetailEst }) {
  return (
    <Fragment>
      <div
        className={`container-popup-est-comp-data-show ${
          popupDetail ? '' : 'container-popup-est-comp-data'
        }`}
      >
        <div className="card-popup-est-comp-data">
          <img
            className="img-close-poup-est-comp-data"
            src={require('../images/close-white.png')}
            alt="Cerrar"
            onClick={closePopupDetailEst}
          />
          <div className="banner-color-popup-detail">
            <h1 className="title-banner-color-popup-detail">
              Detalle de Jackpot
            </h1>
          </div>
          <div className="card-inside-popup-detail">
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Maquina</h1>
              <p className="text-row-mobile-jackpot">#p502024</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Estado</h1>
              <p className="text-row-mobile-jackpot">Activo</p>
            </div>{' '}
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Casino</h1>
              <p className="text-row-mobile-jackpot">#2017m302</p>
            </div>{' '}
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Jackpot</h1>
              <p className="text-row-mobile-jackpot">#o1</p>
            </div>{' '}
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Nombre</h1>
              <p className="text-row-mobile-jackpot">Oro</p>
            </div>{' '}
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Trigger</h1>
              <p className="text-row-mobile-jackpot">1200</p>
            </div>
            <button className="btn-popup-abm-jackpots-delete">
              Dar de baja
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default CardPopupAbmComp;
