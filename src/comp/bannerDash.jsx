import React, { Fragment } from 'react';
import '../styles/dashboard.css';

function BannerDash({ title, formattedDate }) {
  return (
    <Fragment>
      <div className="container container-canvas-dashboard-web">
        <div className="banner-dash">
          <h1 className="title-banner-container-text">{title}</h1>
          <div className="item-banner-flex">
            <h1 className="title-item-banner span-text-banner-date">
              {' '}
              {formattedDate}{' '}
            </h1>
          </div>
          <div>
            <h1 className="title-banner-span-copy">PrometeoIT</h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BannerDash;
