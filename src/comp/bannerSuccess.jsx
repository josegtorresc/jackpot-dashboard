import React, { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/banner.css';

const BannerSuccess = ({ title, banner }) => {
  return (
    <Fragment>
      <div
        className={`card-success-cart ${
          banner ? '' : 'card-success-cart-inactive'
        }`}
      >
        <h1 className="title-card-success-cart"> {title} </h1>
      </div>
    </Fragment>
  );
};

export default BannerSuccess;
