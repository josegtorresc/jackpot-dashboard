import React, { Fragment } from 'react';

function CardNot({ title, text, img }) {
  return (
    <Fragment>
      <div className="card-aside-inside-not">
        <div className="col-inside">
          <img className="img-icon-card-inside" src={img} alt="moneda" />
        </div>
        <div className="col-inside">
          <h1 className="title-not-inside"> {title} </h1>
          <p
            dangerouslySetInnerHTML={{ __html: text }}
            className="text-not-inside"
          ></p>
        </div>
      </div>
    </Fragment>
  );
}

export default CardNot;
