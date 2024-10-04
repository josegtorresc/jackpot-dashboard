import React from 'react';
import TabMobile from '../compsMobiles/tabMobile';
import { motion } from 'framer-motion';
import BackHeaderComp from '../compsMobiles/backHeaderComp';
import CardDasMobile from '../compsMobiles/cardDasMobile';
import '../styles/jackpotsCompMobile.css';

function ConfigCompMobile({ formattedDate }) {
  const textoJackpotCardMobile = 'Realiza reportes <br /> con clicks sencillos';
  const textoJackpotCardMobile2 =
    'Realiza configuraciones <br /> con clicks sencillos';
  const textoJackpotCardMobile3 =
    'Notifica cada cosa <br /> con clicks sencillos';

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
          <div className="container-banner-absolute-detail-mobile"></div>

          <div className="container">
            <div className="container-mobile-card-banner">
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

            <CardDasMobile
              title="Reportes"
              text={textoJackpotCardMobile}
              textButton="Configurar"
              img={require('../images/repor.png')}
            />
            <CardDasMobile
              title="Configura"
              text={textoJackpotCardMobile2}
              textButton="Configurar"
              img={require('../images/conf.png')}
            />
            <CardDasMobile
              title="Notifica"
              text={textoJackpotCardMobile3}
              textButton="Configurar"
              img={require('../images/noti.png')}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ConfigCompMobile;
