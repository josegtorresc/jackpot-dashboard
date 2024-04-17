import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/banner.css';

const Banner = ({ title }) => {
  const [banner, setBanner] = useState(true);

  const hide = () => {
    setBanner(false);
  };

  setTimeout(hide, 3000);
  return (
    <React.Fragment>
      <div
        className={`card-success-cart ${
          banner ? '' : 'card-success-cart-inactive'
        }`}
      >
        <h1 className="title-card-success-cart"> {title} </h1>
      </div>
    </React.Fragment>
  );
};

export default Banner;
