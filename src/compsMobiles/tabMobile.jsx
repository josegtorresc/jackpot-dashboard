import React, { Fragment } from 'react';
import '../styles/tabMobile.css';
import { Link, NavLink } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

function TabMobile() {
  const location = useLocation();

  const iconStyle = {
    fontSize: '28px',
  };

  const iconStyleUser = {
    fontSize: '27px',
    opacity: '.9',
  };

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <Fragment>
      <div className="container-nav-home">
        <div className="general-container-bottom-nav">
          <div className="general-container-icons-bottom-nav">
            <NavLink
              exact
              activeClassName="active-icon"
              to="/dashboard"
              className="container-icon-bt-nav"
            ></NavLink>
            <NavLink
              exact
              activeClassName="active-icon"
              to="/dashboard/jackpots"
              className="container-icon-bt-nav"
            ></NavLink>
            <NavLink
              exact
              activeClassName="active-icon"
              to="/dashboard/players"
              className="container-icon-bt-nav"
            ></NavLink>
            <NavLink
              activeClassName="active-icon"
              className="container-icon-bt-nav"
              to="/dashboard/estadisticas"
            ></NavLink>
            <NavLink
              activeClassName="active-icon"
              className="container-icon-bt-nav"
              to="/dashboard/configuracion"
            ></NavLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TabMobile;
