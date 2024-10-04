import React from 'react';
import TabMobile from '../compsMobiles/tabMobile';
import { motion } from 'framer-motion';
import BackHeaderComp from '../compsMobiles/backHeaderComp';
import CardDasMobile from '../compsMobiles/cardDasMobile';
import '../styles/jackpotsCompMobile.css';

function PlayersCompMobile({ formattedDate }) {
  const textoJackpotCardMobile =
    'Administra los players <br /> con clicks sencillos';

  const textoJackpotCardMobile2 =
    'Realiza configuraciones <br /> con clicks sencillos';
  const textoJackpotCardMobile3 =
    'Accede a estadisticas <br /> con clicks sencillos';

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
              title="Adiministra"
              text={textoJackpotCardMobile}
              textButton="Configurar"
              img={require('../images/user.png')}
            />
            <CardDasMobile
              title="Configura"
              text={textoJackpotCardMobile2}
              textButton="Configurar"
              img={require('../images/conf.png')}
            />
            <CardDasMobile
              title="Accede"
              text={textoJackpotCardMobile3}
              textButton="Configurar"
              img={require('../images/graf.png')}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PlayersCompMobile;
