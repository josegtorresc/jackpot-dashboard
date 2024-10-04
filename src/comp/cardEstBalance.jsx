import React, { Fragment } from 'react';
import { RingLoader } from 'react-spinners';
import '../styles/cardEstBalance.css';

function CardEstBalance({
  img,
  textJackpot,
  balanceJackpot,
  loading,
  onClick,
}) {
  return (
    <Fragment>
      <div className="card-est-balance-row" onClick={onClick}>
        <div>
          <img className="img-est-balance-row-card" src={img} alt="Oro" />
        </div>
        <div>
          <h1 className="title-identify-card-est-balance-row">Jackpot</h1>
          <p className="text-valueid-card"> {textJackpot} </p>
        </div>
        <div>
          <h1 className="title-identify-card-est-balance-row">Monto</h1>
          {loading ? (
            <div className="spinner-container">
              <RingLoader color={'orange'} loading={loading} size={30} />
            </div>
          ) : (
            <p className="text-valueid-card balance-jackpot">
              {' '}
              {balanceJackpot}{' '}
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default CardEstBalance;
