import React, { Fragment } from 'react';
import '../styles/tabDash.css';
import { NavLink } from 'react-router-dom';
import { useUser } from '../services/UserContext';

function TabDashTry({ selectedComponent }) {
  const { permissions, logout } = useUser();

  const shouldShowComponent = (component) => {
    if (!permissions || permissions.length === 0) return false;
    if (permissions.includes('todos')) return true;

    if (permissions.includes('intermedios')) {
      return (
        component === 'dashboard/estadisticas' ||
        component === 'dashboard/configuracion'
      );
    }

    return component === 'dashboard/estadisticas';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <div className="conatiner-tab-dash">
        <NavLink to="/dashboard">
          <div className="container-title-top-dash">
            <h1 className="title-top-dash">Dashboard</h1>
          </div>
        </NavLink>

        {shouldShowComponent('dashboard/jackpots') && (
          <NavLink to="/dashboard/jackpots">
            <div
              className={`item-tab-dash-options ${
                selectedComponent === 'dashboard/jackpots' ? 'selected' : ''
              }`}
            >
              <h1 className="text-tab-dash-options">Jackpots</h1>
            </div>
          </NavLink>
        )}

        {shouldShowComponent('dashboard/players') && (
          <NavLink to="/dashboard/players">
            <div
              className={`item-tab-dash-options ${
                selectedComponent === 'dashboard/players' ? 'selected' : ''
              }`}
            >
              <h1 className="text-tab-dash-options">Players</h1>
            </div>
          </NavLink>
        )}

        {shouldShowComponent('dashboard/estadisticas') && (
          <NavLink to="/dashboard/estadisticas">
            <div
              className={`item-tab-dash-options ${
                selectedComponent === 'dashboard/estadisticas' ? 'selected' : ''
              }`}
            >
              <h1 className="text-tab-dash-options">Estadisticas</h1>
            </div>
          </NavLink>
        )}

        {shouldShowComponent('dashboard/configuracion') && (
          <NavLink to="/dashboard/configuracion">
            <div
              className={`item-tab-dash-options ${
                selectedComponent === 'dashboard/configuracion'
                  ? 'selected'
                  : ''
              }`}
            >
              <h1 className="text-tab-dash-options">Reportes</h1>
            </div>
          </NavLink>
        )}

        <NavLink to="/">
          <div
            className='item-tab-dash-options'
            onClick={handleLogout}
          >
            <h1 className="text-tab-dash-options">Cerrar Sesión</h1>
          </div>
        </NavLink>

        {/* Ejemplos de componentes adicionales que podrían mostrarse según permisos */}
        {/* {shouldShowComponent('dashboard/abm/jackpots') && (
          <NavLink to="/dashboard/abm/jackpots">
            <div
              className={`item-tab-dash-options ${
                selectedComponent === 'dashboard/abm/jackpots' ? 'selected' : ''
              }`}
            >
              <span className="item-img-span span-tab-dash"></span>
              <h1 className="text-tab-dash-options">
                ABM Jackpots <RiCoinLine />
              </h1>
            </div>
          </NavLink>
        )}

        {shouldShowComponent('dashboard/abm/users') && (
          <NavLink to="/dashboard/abm/users">
            <div
              className={`item-tab-dash-options ${
                selectedComponent === 'dashboard/abm/users' ? 'selected' : ''
              }`}
            >
              <span className="item-img-span span-tab-dash"></span>
              <h1 className="text-tab-dash-options">
                ABM Users <RiShieldUserLine />
              </h1>
            </div>
          </NavLink>
        )} */}
      </div>
    </Fragment>
  );
}

export default TabDashTry;
