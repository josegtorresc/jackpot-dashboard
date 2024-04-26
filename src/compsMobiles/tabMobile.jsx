import React, { Fragment } from 'react';
import '../styles/tabMobile.css';
import { Link } from 'react-router-dom';

function TabMobile() {
  return (
    <Fragment>
      <div className="container-nav-home">
        <div className="general-container-bottom-nav">
          <div className="general-container-icons-bottom-nav">
            <Link
              exact
              activeClassName="nav"
              to="/dashboard"
              className="container-icon-bt-nav"
            >
              <img class="icon-bt-nav" src={require('../images/casa.png')} />
            </Link>
            <Link
              exact
              activeClassName="nav"
              to="/finanzas"
              className="container-icon-bt-nav"
            >
              <img class="icon-bt-nav" src={require('../images/dinero.png')} />
            </Link>
            <Link
              exact
              activeClassName="nav"
              to="/actividades"
              className="container-icon-bt-nav"
            >
              <img class="icon-bt-nav" src={require('../images/usuario.png')} />
            </Link>
            <Link className="container-icon-bt-nav" to="/profile">
              <img
                class="icon-bt-nav"
                src={require('../images/configuracion.png')}
              />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TabMobile;
