import React from 'react';
import '../styles/bannerMobile.css';

function BannerMobile({ formattedDate }) {
  return (
    <div>
      <div className="banner-mobile-container-flex">
        <h1 className="title-banner-mobile">
          Bienvenid@ a tu <br />
          dashboard!!{' '}
        </h1>
        <h1 className="title-item-banner span-text-banner-date">
          {' '}
          {formattedDate}{' '}
        </h1>
        <h1 className="title-banner-span-copy">PrometeoIT</h1>
      </div>
    </div>
  );
}

export default BannerMobile;
