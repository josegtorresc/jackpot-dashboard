import React, { Fragment } from 'react';
import LoadingDetailTrans from './loaderDetailTrans';
import { motion } from 'framer-motion';
import NotCompBackHeader from './notCompBackHeader';

function EstCompMobileDetail({ selectedTransaction, handleBackToList }) {
  return (
    <Fragment>
      <LoadingDetailTrans />
      <motion.div
        transition={{
          duration: 0.4,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <div className="transaction-detail-est-comp-mobile-visble">
          <div className="container">
            <div className="container-header-detail-trans">
              <img
                className="img-back-deatil-trans"
                src={require('../images/back.png')}
                onClick={handleBackToList}
                alt="back"
              />

              <h1 className="title-top-detail">Detalles</h1>
              <NotCompBackHeader />
            </div>

            <div className="span-absolute-routes span-routes-detail-trans">
              <div className="container-items-row-dash-mobile-routes span-routes-detail">
                <div>
                  <h1 className="title-route-row span-selected">
                    Atribuciones
                  </h1>
                </div>
                <div>
                  <h1 className="title-route-row">Fecha</h1>
                </div>
                <div>
                  <h1 className="title-route-row">Players</h1>
                </div>
                <div>
                  <h1 className="title-route-row span-item-row-balance-sections">
                    Jackpots
                  </h1>
                </div>
              </div>
            </div>

            <div className="container-banner-trans-detail">
              <div className="inside-container-banner-transparent-detail">
                <div>
                  <img
                    className="img-details-trans"
                    src={require('../images/oro.png')}
                    alt=""
                  />
                  <p className="text-trans-detail-jackpots">
                    {selectedTransaction.jackpotsWon.oro}
                  </p>
                </div>
                <div>
                  <img
                    className="img-details-trans"
                    src={require('../images/plata.png')}
                    alt=""
                  />
                  <p className="text-trans-detail-jackpots">
                    {selectedTransaction.jackpotsWon.plata}
                  </p>
                </div>
                <div>
                  <img
                    className="img-details-trans"
                    src={require('../images/bronce.png')}
                    alt=""
                  />
                  <p className="text-trans-detail-jackpots">
                    {selectedTransaction.jackpotsWon.bronce}
                  </p>
                </div>
              </div>
            </div>

            <div className="section-data-details">
              <div className="card-data-detail">
                <h1 className="text-card-data-detail">Fecha y Hora</h1>
                <p className="text-data-detail">
                  {' '}
                  {selectedTransaction.timestamp}{' '}
                </p>
              </div>
              <div className="card-data-detail">
                <h1 className="text-card-data-detail">ID Jugador</h1>
                <p className="text-data-detail"> {selectedTransaction.ip} </p>
              </div>

              <div className="card-data-detail">
                <h1 className="text-card-data-detail">ID Máquina</h1>
                <p className="text-data-detail"> {selectedTransaction.ip} </p>
              </div>
              <div className="card-data-detail">
                <h1 className="text-card-data-detail">Total ATB</h1>
                <p className="text-data-detail">
                  {' '}
                  {selectedTransaction.totalAmountWon}{' '}
                </p>
              </div>
              <div className="card-data-detail">
                <h1 className="text-card-data-detail">Locación</h1>
                <p className="text-data-detail">
                  {' '}
                  {selectedTransaction.transactionId}{' '}
                </p>
              </div>
              <div className="card-data-detail">
                <h1 className="text-card-data-detail">Operación</h1>
                <p className="text-data-detail">
                  {' '}
                  {selectedTransaction.timeZone}{' '}
                </p>
              </div>
            </div>

            <div className="cont-btn-detail-trans">
              <button className="btn-detail-trans">Descargar detalles</button>
            </div>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default EstCompMobileDetail;
