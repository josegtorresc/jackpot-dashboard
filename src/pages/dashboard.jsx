import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../styles/dashboard.css';
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
import DashboardMobile from './dashboardMobile';
import JackpotsCompMobile from './jackpotsCompMobile';
import PlayersCompMobile from './playersCompMobile';
import ConfigCompMobile from './configCompMobile';
import EstCompMobile from './estCompMobile';
import AbmComp from '../comp/abmComp';
import LoadingDetailTrans from '../compsMobiles/loaderDetailTrans';
import AbmUsuarios from '../comp/abmUsuarios';
import AbmMaquinas from '../comp/abmMaquinas';
import AbmCasinos from '../comp/abmCasinos';
import AbmGruposCasinos from '../comp/abmGruposCasinos';
import AbmGruposMaquinas from '../comp/abmGruposMaquinas';
import TabDashTry from '../comp/tabDashTry';

function Dashboard() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
      <Banner title="Bienvenido a tu dashboard!" />
      <FlashMessage title="Bienvenido a tu dashboard!" />
      <LoadingDetailTrans />

      <div className="container-web-viewport">
        <div className="container container-general-dash">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-2">
              <TabDashTry selectedComponent={selectedComponent} />
            </div>
            <div className="col-md-9 col-lg-9 col-xl-10 canvas-dashboard-web">
              <Routes>
                <Route
                  path="/"
                  element={<DashboardComp formattedDate={formattedDate} />}
                />
                <Route
                  path="jackpots"
                  element={
                    <JackpotsComp
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="players"
                  element={
                    <PlayersComp
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="estadisticas"
                  element={
                    <EstComp
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="configuracion"
                  element={
                    <ConfigComp
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="abm/jackpots"
                  element={
                    <AbmComp
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="abm/usuarios"
                  element={
                    <AbmUsuarios
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="abm/maquinas"
                  element={
                    <AbmMaquinas
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="abm/casinos"
                  element={
                    <AbmCasinos
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="abm/grupos-casinos"
                  element={
                    <AbmGruposCasinos
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
                <Route
                  path="abm/grupos-maquinas"
                  element={
                    <AbmGruposMaquinas
                      formattedDate={formattedDate}
                      selectedComponent={selectedComponent}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      <div className="container-mobile-routes">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardMobile
                settings={settings}
                formattedDate={formattedDate}
                textoJackpotCardMobile={textoJackpotCardMobile}
                textoJackpotCardMobile2={textoJackpotCardMobile2}
                textoJackpotCardMobile3={textoJackpotCardMobile3}
                textoJackpotCardMobile4={textoJackpotCardMobile4}
              />
            }
          />
          <Route
            path="jackpots"
            element={
              <JackpotsCompMobile
                settings={settings}
                formattedDate={formattedDate}
              />
            }
          />
          <Route
            path="players"
            element={<PlayersCompMobile formattedDate={formattedDate} />}
          />
          <Route
            path="estadisticas"
            element={<EstCompMobile formattedDate={formattedDate} />}
          />
          <Route
            path="configuracion"
            element={<ConfigCompMobile formattedDate={formattedDate} />}
          />
        </Routes>
      </div>
    </Fragment>
  );
}

export default Dashboard;
