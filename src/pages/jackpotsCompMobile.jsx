import React, { useState, useEffect } from 'react';
import TabMobile from '../compsMobiles/tabMobile';
import { motion } from 'framer-motion';
import BackHeaderComp from '../compsMobiles/backHeaderComp';
import CardDasMobile from '../compsMobiles/cardDasMobile';
import '../styles/jackpotsCompMobile.css';
import CardPopupJackpotTriggerMobile from '../compsMobiles/cardPopupJackpotTriggerMobile';

function JackpotsCompMobile({ formattedDate }) {
  const [popupJackpotTriggerMobile, setPopupJackpotTriggerMobile] =
    useState(false);

  const textoJackpotCardMobile =
    'Administra los montos <br /> con clicks sencillos';
  const textoJackpotCardMobile2 = 'Configura cada uno <br /> los jackpots ';
  const textoJackpotCardMobile3 =
    'Administra los triggers <br /> con clicks sencillos';

  const showMobileJackpotPopupComp = () => {
    setPopupJackpotTriggerMobile(true);
  };

  const closePopupJackpotsAct = () => {
    setPopupJackpotTriggerMobile(false);
  };

  return (
    <div>
      <div className="container-home container-mobile-viewport-app">
        <BackHeaderComp />
        <TabMobile />
        <motion.div
          transition={{
            duration: 0.17,
            delay: 0.17,
            ease: [0.5, 0.71, 1, 1.5],
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CardPopupJackpotTriggerMobile
            popupJackpotTriggerMobile={popupJackpotTriggerMobile}
            closePopupJackpotsAct={closePopupJackpotsAct}
          />

          <div className="container-banner-absolute-detail-mobile"></div>

          <div className="container">
            <div className="container-mobile-card-banner">
              <h1 className="title-banner-mobile">
                Administra los
                <br />
                Jackpots!!{' '}
              </h1>
              <h1 className="title-item-banner span-text-banner-date">
                {' '}
                {formattedDate}{' '}
              </h1>
              <h1 className="title-banner-span-copy">PrometeoIT</h1>
            </div>

            <div onClick={showMobileJackpotPopupComp}>
              <CardDasMobile
                title="Adiministra"
                text={textoJackpotCardMobile}
                textButton="Configurar"
                img={require('../images/mon.png')}
              />
            </div>
            <CardDasMobile
              title="Configura"
              text={textoJackpotCardMobile2}
              textButton="Configurar"
              img={require('../images/conf.png')}
            />
            <CardDasMobile
              title="Administra"
              text={textoJackpotCardMobile3}
              textButton="adiministrar"
              img={require('../images/ganador.png')}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default JackpotsCompMobile;
