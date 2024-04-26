import React, { Fragment } from 'react';
import '../styles/headerComp.css';

function HeaderComp() {
  return (
    <Fragment>
      <header className="header-mobile-viewport">
        <div>
          <h1 className="logo-app">Promoteoit</h1>
        </div>
        <div>
          <button className="btn-close-sescion">Cerrar sesión</button>
        </div>
      </header>
    </Fragment>
  );
}

export default HeaderComp;
