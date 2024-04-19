import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/dashboard.css';
import TabDash from '../comp/tabDash';
import Banner from '../comp/banner';
import { motion } from 'framer-motion';
import DashboardComp from '../comp/dashboardComp';
import JackpotsComp from '../comp/jackpotsComp';
import FlashMessage from '../comp/flashMessage';
import myAudio from '../audios/alert.mp3';
import PlayersComp from '../comp/playersComp';
import EstComp from '../comp/estComp';
import ConfigComp from '../comp/configComp';

function Dashboard() {
  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audio = new Audio(myAudio);
      audio.play();
    }, 4000);
    return () => clearTimeout(audioTimeout);
  }, []);

  return (
    <Fragment>
      <motion.div
        transition={{
          duration: 0.3,
          delay: 0.3,
          ease: [0.5, 0.71, 1, 1.5],
        }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Banner title="Bienvenido a tu dashboard!" />
        <FlashMessage title="Bienvenido a tu dashboard!" />

        <div className="container container-general-dash">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-2">
              <TabDash />
            </div>
            <div className="col-md-9 col-lg-9 col-xl-10 canvas-dashboard-web">
              <Routes>
                <Route path="/" element={<DashboardComp />} />
                <Route path="jackpots" element={<JackpotsComp />} />
                <Route path="players" element={<PlayersComp />} />
                <Route path="estadisticas" element={<EstComp />} />
                <Route path="configuracion" element={<ConfigComp />} />
              </Routes>
            </div>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default Dashboard;
