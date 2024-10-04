import React, { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/loaderDetailTrans.css';
import { RingLoader } from 'react-spinners';
import '../styles/cardEstBalance.css';

const LoadingDetailTrans = ({ title }) => {
  const [loaderDetail, setLoaderDetail] = useState(true);

  const hide = () => {
    setLoaderDetail(false);
  };

  setTimeout(hide, 2000);
  return (
    <Fragment>
      <div
        className={`section-active ${loaderDetail ? '' : 'section-inactive'}`}
      >
        <h1 className="title-card-success-cart">
          {' '}
          <RingLoader color={'orange'} size={45} />{' '}
        </h1>
      </div>
    </Fragment>
  );
};

export default LoadingDetailTrans;
