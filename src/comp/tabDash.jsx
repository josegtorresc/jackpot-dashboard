import React, { Fragment } from 'react';
import '../styles/tabDash.css';
import { NavLink } from 'react-router-dom';

function TabDash() {
  return (
    <Fragment>
      <div className="conatiner-tab-dash">
        <NavLink to="/dashboard" activeClassName="selected">
          <div className="container-title-top-dash">
            <h1 className="title-top-dash">Dashboard</h1>
          </div>
        </NavLink>

        <NavLink to="/dashboard/jackpots" activeClassName="selected">
          <div className="item-tab-dash-options">
            <h1 className="text-tab-dash-options">Jackpots</h1>
          </div>
        </NavLink>

        <NavLink to="/dashboard/players" activeClassName="selected">
          <div className="item-tab-dash-options">
            <h1 className="text-tab-dash-options">Players</h1>
          </div>
        </NavLink>

        <NavLink to="/dashboard/estadisticas" activeClassName="selected">
          <div className="item-tab-dash-options">
            <h1 className="text-tab-dash-options">Estadisticas</h1>
          </div>
        </NavLink>

        <NavLink to="/dashboard/configuracion" activeClassName="selected">
          <div className="item-tab-dash-options">
            <h1 className="text-tab-dash-options">Config</h1>
          </div>
        </NavLink>

        <div className="container-btn-out-tab">
          <button className="btn-out-tab">Cerrar Sesión</button>
        </div>
      </div>
    </Fragment>
  );
}

export default TabDash;
