import React, { Fragment } from 'react';
import '../styles/emptyNot.css';

function EmptyNot() {
  return (
    <Fragment>
      <div>
        <div className="container-empty-nots">
          <img
            className="img-empty-nots"
            src={require('../images/empty.png')}
            alt="empty-nots"
          />
          <h1 className="title-empty-nots">No hay notificaciones / Reportes</h1>
        </div>
      </div>
    </Fragment>
  );
}

export default EmptyNot;
