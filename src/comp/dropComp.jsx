import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function DropComp({ selectedComponent }) {
  return (
    <Fragment>
      <div className="dropdown dropdown-dash">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Secciones del dash
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link to="/dashboard">
              <a className="dropdown-item" href="#inicio">
                Inicio
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/jackpots">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/jackpots' ? 'selected' : ''
                }`}
                href="#jackpots"
              >
                Jackpots
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/players">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/players' ? 'selected' : ''
                }`}
                href="#jugadores"
              >
                Players - Jugadores
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/estadisticas">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/estadisticas'
                    ? 'selected'
                    : ''
                }`}
                href="#estadisticas"
              >
                Estadicticas
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/configuracion">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/configuracion'
                    ? 'selected'
                    : ''
                }`}
                href="#config"
              >
                Reportes - Notificaciones
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/abm/jackpots">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/abm/jackpots'
                    ? 'selected'
                    : ''
                }`}
                href="#abmjackpots"
              >
                ABM Jackpots
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/abm/usuarios">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/abm/usuarios'
                    ? 'selected'
                    : ''
                }`}
                href="#abmusuarios"
              >
                ABM Usuarios
              </a>
            </Link>
            <Link to="/dashboard/abm/maquinas">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/abm/maquinas'
                    ? 'selected'
                    : ''
                }`}
                href="#abmmaquinas"
              >
                ABM Máquinas
              </a>
            </Link>
            <Link to="/dashboard/abm/casinos">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/abm/casinos'
                    ? 'selected'
                    : ''
                }`}
                href="#abmcasinos"
              >
                ABM Casinos
              </a>
            </Link>
            <Link to="/dashboard/abm/grupos-casinos">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/abm/grupos-casinos'
                    ? 'selected'
                    : ''
                }`}
                href="#abmcasinos"
              >
                ABM Grupos Casinos
              </a>
            </Link>
            <Link to="/dashboard/abm/grupos-maquinas">
              <a
                className={`dropdown-item ${
                  selectedComponent === 'dashboard/abm/grupos-maquinas'
                    ? 'selected'
                    : ''
                }`}
                href="#abmcasinos"
              >
                ABM Grupos Maquinas
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default DropComp;
