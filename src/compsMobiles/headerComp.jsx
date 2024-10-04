import React, { Fragment } from 'react';
import '../styles/headerComp.css';
import NotCompBackHeader from './notCompBackHeader';

function HeaderComp() {
  return (
    <Fragment>
      <header className="header-mobile-viewport">
        <div>
          <h1 className="logo-app">ADM - Prometeoit</h1>
        </div>
        <NotCompBackHeader />
      </header>
    </Fragment>
  );
}

export default HeaderComp;
