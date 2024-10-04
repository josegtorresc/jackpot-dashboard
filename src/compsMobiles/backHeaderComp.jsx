import React, { Fragment } from 'react';
import '../styles/backHeaderComp.css';
import { Link } from 'react-router-dom';
import NotCompBackHeader from './notCompBackHeader';

function BackHeaderComp() {
  return (
    <Fragment>
      <div className="container-header-back-comp">
        <Link to="/dashboard">
          <img
            className="img-header-back-comp"
            src={require('../images/back.png')}
            alt="atras"
          />
        </Link>
        <h1 className="text-logo-header-back">Prometeoit</h1>
        <NotCompBackHeader />
      </div>
    </Fragment>
  );
}

export default BackHeaderComp;
