import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function DropComp() {
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
              <a className="dropdown-item" href="#">
                Inicio
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/jackpots">
              <a className="dropdown-item" href="#">
                Jackpots
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/players">
              <a className="dropdown-item" href="#">
                Players - Jugadores
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/estadisticas">
              <a className="dropdown-item" href="#">
                Estadicticas
              </a>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/configuracion">
              <a className="dropdown-item" href="#">
                Configuración del jackpot
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default DropComp;
