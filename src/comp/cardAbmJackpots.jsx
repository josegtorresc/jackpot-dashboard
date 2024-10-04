import React, { Fragment } from 'react';
import '../styles/cardAbmJackpots.css';

function CardAbmJackpots({ img, title, onClick }) {
  return (
    <Fragment>
      <div className="card-abm-jackpots" onClick={onClick}>
        <div>
          <img className="img-abm-jackpots" src={img} alt="foto" />
        </div>
        <div>
          <h1 className="title-abm-jackpots"> {title} </h1>
          <p className="text-abm-jackpots">
            Todo con clicks <br /> sencillos
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default CardAbmJackpots;
