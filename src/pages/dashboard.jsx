import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeaderComp from '../compsMobiles/headerComp';
import TabMobile from '../compsMobiles/tabMobile';
import NotComp from '../comp/notComp';
import BannerDash from '../comp/bannerDash';
import BannerDash2 from '../comp/bannerDash2';
import BannerMobile from '../compsMobiles/bannerMobile';
import CardDasMobile from '../compsMobiles/cardDasMobile';

function Dashboard() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Velocidad de transición en milisegundos
    slidesToShow: 1, // Número de slides a mostrar a la vez
    slidesToScroll: 1, // Número de slides a desplazar por vez
    autoplay: true,
    autoplaySpeed: 5000, // Tiempo en milisegundos para cambiar de slide (10 segundos)
    pauseOnHover: true,
  };

  const [selectedComponent, setSelectedComponent] = useState('');
  const location = useLocation();

  const navigation = useNavigate();

  useEffect(() => {
    const audioTimeout = setTimeout(() => {
      const audio = new Audio(myAudio);
      audio.play();
    }, 4000);
    return () => clearTimeout(audioTimeout);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    setSelectedComponent(getComponentName(currentPath));
  }, [location.pathname]);

  const getComponentName = (path) => {
    return path.slice(1).toLowerCase();
  };

  const navigate = () => {
    navigation('/actividades');
  };

  console.log(location);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const options = { day: 'numeric', month: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  const textoJackpotCardMobile =
    'Configura los jackpots <br /> con clicks sencillos';

  const textoJackpotCardMobile2 =
    'Administra los jackpots <br /> con clicks sencillos';

  const textoJackpotCardMobile3 =
    'Administra los usuarios <br /> con clicks sencillos';

  const textoJackpotCardMobile4 =
    'Acceder a las estadisticas <br /> con clicks sencillos';

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

        <div className="container-web-viewport">
          <div className="container container-general-dash">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-2">
                <TabDash selectedComponent={selectedComponent} />
              </div>
              <div className="col-md-9 col-lg-9 col-xl-10 canvas-dashboard-web">
                <Routes>
                  <Route
                    path="/"
                    element={<DashboardComp formattedDate={formattedDate} />}
                  />
                  <Route
                    path="jackpots"
                    element={<JackpotsComp formattedDate={formattedDate} />}
                  />
                  <Route
                    path="players"
                    element={<PlayersComp formattedDate={formattedDate} />}
                  />
                  <Route
                    path="estadisticas"
                    element={<EstComp formattedDate={formattedDate} />}
                  />
                  <Route
                    path="configuracion"
                    element={<ConfigComp formattedDate={formattedDate} />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>

        <div className="container container-home container-mobile-viewport-app">
          <HeaderComp />
          <TabMobile />

          <div className="container-title-top-mobile">
            <div>
              <h1 className="title-top">Dashboard - Inicio</h1>
            </div>
            <div className="container-span-items-row-not">
              <NotComp />
            </div>
          </div>

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
            <CardDasMobile
              title="Configura"
              text={textoJackpotCardMobile}
              textButton="Configurar"
              img={require('../images/conf.png')}
            />
            <CardDasMobile
              title="Administra"
              text={textoJackpotCardMobile2}
              textButton="Administrar"
              img={require('../images/mon.png')}
            />
            <CardDasMobile
              title="Administra"
              text={textoJackpotCardMobile3}
              textButton="Administrar"
              img={require('../images/user.png')}
            />
            <CardDasMobile
              title="Accede"
              text={textoJackpotCardMobile4}
              textButton="Administrar"
              img={require('../images/graf.png')}
            />
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default Dashboard;
