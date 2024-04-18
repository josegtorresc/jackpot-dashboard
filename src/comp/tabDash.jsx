import React, { Fragment } from 'react';
import '../styles/tabDash.css';
import { NavLink } from 'react-router-dom';

function TabDash() {
  return (
    <Fragment>
      <div className="conatiner-tab-dash">
        <div className="container-title-top-dash">
          <h1 className="title-top-dash">Dashboard</h1>
        </div>
        <div className="item-tab-dash-options">
          <NavLink to="jackpots" activeClassName="selected">
            <h1 className="text-tab-dash-options">Jackpots</h1>
          </NavLink>
        </div>
        <div className="item-tab-dash-options">
          <NavLink to="players" activeClassName="selected">
            <h1 className="text-tab-dash-options">Players</h1>
          </NavLink>
        </div>
        <div className="item-tab-dash-options">
          <NavLink to="estadisticas" activeClassName="selected">
            <h1 className="text-tab-dash-options">Estadisticas</h1>
          </NavLink>
        </div>
        <div className="item-tab-dash-options">
          <NavLink to="configuracion" activeClassName="selected">
            <h1 className="text-tab-dash-options">Config</h1>
          </NavLink>
        </div>
        <div className="container-btn-out-tab">
          <button className="btn-out-tab">Cerrar Sesión</button>
        </div>
      </div>
    </Fragment>
  );
}

export default TabDash;
