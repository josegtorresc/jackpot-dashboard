import React, { Fragment } from 'react';
import { RingLoader } from 'react-spinners';
import '../styles/loadingEstJackpots.css';

function LoadingEstJackpots() {
  return (
    <Fragment>
      <div className="container-loader-genaral-est-jackpots">
        <RingLoader color={'orange'} size={45} />
      </div>
    </Fragment>
  );
}

export default LoadingEstJackpots;
