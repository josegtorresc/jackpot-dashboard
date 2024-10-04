import React from 'react';
import HeaderComp from '../compsMobiles/headerComp';
import TabMobile from '../compsMobiles/tabMobile';
import BannerMobile from '../compsMobiles/bannerMobile';
import CardDasMobile from '../compsMobiles/cardDasMobile';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function DashboardMobile({
  settings,
  formattedDate,
  textoJackpotCardMobile,
  textoJackpotCardMobile2,
  textoJackpotCardMobile3,
  textoJackpotCardMobile4,
}) {
  return (
    <div>
      <div className="container container-home container-mobile-viewport-app span-dash-mobile">
        <HeaderComp />
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
          <div className="container-items-row-dash-mobile-routes">
            <div>
              <h1 className="title-route-row span-selected">Inicio</h1>
            </div>
            <div>
              <h1 className="title-route-row">Jackpots</h1>
            </div>
            <div>
              <h1 className="title-route-row">Players</h1>
            </div>
            <div>
              <h1 className="title-route-row span-item-row-balance-sections">
                Config
              </h1>
            </div>
          </div>

          <Slider {...settings}>
            <div>
              <BannerMobile formattedDate={formattedDate} />
            </div>
            <div>
              <BannerMobile formattedDate={formattedDate} />
            </div>
          </Slider>

          <div className="container-row-items-sections">
            <Link to="configuracion">
              <CardDasMobile
                title="Configura"
                text={textoJackpotCardMobile}
                textButton="Configurar"
                img={require('../images/conf.png')}
              />
            </Link>
            <Link to="jackpots">
              <CardDasMobile
                title="Administra"
                text={textoJackpotCardMobile2}
                textButton="Administrar"
                img={require('../images/mon.png')}
              />
            </Link>
            <Link to="players">
              <CardDasMobile
                title="Administra"
                text={textoJackpotCardMobile3}
                textButton="Administrar"
                img={require('../images/user.png')}
              />
            </Link>
            <Link to="estadisticas">
              <CardDasMobile
                title="Accede"
                text={textoJackpotCardMobile4}
                textButton="Administrar"
                img={require('../images/graf.png')}
              />
            </Link>
          </div>
          <TabMobile />
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardMobile;
