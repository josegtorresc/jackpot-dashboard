import React, { Fragment } from 'react';
import '../styles/tabDash.css';
import { NavLink } from 'react-router-dom';

function TabDash({ selectedComponent }) {
  return (
    <Fragment>
      <div className="conatiner-tab-dash">
        <NavLink to="/dashboard">
          <div className="container-title-top-dash">
            <h1 className="title-top-dash">Dashboard</h1>
          </div>
        </NavLink>

        <NavLink to="/dashboard/jackpots">
          <div
            className={`item-tab-dash-options ${
              selectedComponent === 'dashboard/jackpots' ? 'selected' : ''
            }`}
          >
            <span className="item-img-span span-tab-dash"></span>
            <h1 className="text-tab-dash-options">Jackpots</h1>
          </div>
        </NavLink>

        <NavLink to="/dashboard/players">
          <div
            className={`item-tab-dash-options ${
              selectedComponent === 'dashboard/players' ? 'selected' : ''
            }`}
          >
            <span className="item-img-span span-tab-dash"></span>
            <h1 className="text-tab-dash-options">Players</h1>
          </div>
        </NavLink>

        <NavLink to="/dashboard/estadisticas">
          <div
            className={`item-tab-dash-options ${
              selectedComponent === 'dashboard/estadisticas' ? 'selected' : ''
            }`}
          >
            <span className="item-img-span span-tab-dash"></span>
            <h1 className="text-tab-dash-options">Estadisticas</h1>
          </div>
        </NavLink>

        <NavLink to="/dashboard/configuracion">
          <div
            className={`item-tab-dash-options ${
              selectedComponent === 'dashboard/configuracion' ? 'selected' : ''
            }`}
          >
            <span className="item-img-span span-tab-dash"></span>
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
