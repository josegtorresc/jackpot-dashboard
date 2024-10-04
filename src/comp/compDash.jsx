import React, { Fragment } from 'react';
import '../styles/compDash.css';

function CompDash({ title, text, img, textBtn, click }) {
  return (
    <Fragment>
      <div className="card-dash-item-inside">
        <h1 className="title-card-item-inside">{title}</h1>
        <h5
          dangerouslySetInnerHTML={{ __html: text }}
          className="text-card-item-inside"
        ></h5>
        <div className="container-img-span-card-inside">
          <img className="img-span-card-inside" src={img} />
        </div>
        <div className="container-btn-card-inside">
          <button className="btn-card-inside" onClick={click}>
            {' '}
            {textBtn}
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default CompDash;
