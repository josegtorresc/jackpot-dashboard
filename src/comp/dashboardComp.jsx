import React, { Fragment } from 'react';
import BannerDash from './bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import BannerDash2 from './bannerDash2';
import CompDash from './compDash';
import { Link } from 'react-router-dom';
import NotComp from './notComp';

function DashboardComp({ formattedDate }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const textoJackpot =
    'Administra cada item <br /> de cada jackpot con clicks <br /> sencillos';
  const textoPlayer =
    'Administra cada jugador,<br /> accede a sus datos y <br /> estadísticas';
  const textoEst =
    'Accede a las estadisticas <br /> de los jackpots y estate <br /> actualizado';
  const textoConfig =
    'Configura las condiciones <br /> de los jackpots y establece <br />un orden';

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
        <div className="container-title-top-dash-general">
          <h1 className="title-top-dash-general">
            Dashboard{' '}
            <span className="span-title-dash-view-mobile">
              - PrometeoIT Solutions
            </span>
          </h1>
          <span></span>
          <div className="dropdown dropdown-dash">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Secciones del dash
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/dashboard/jackpots">
                  <a className="dropdown-item" href="#">
                    Jackpots
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/players">
                  <a className="dropdown-item" href="#">
                    Players - Jugadores
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/estadisticas">
                  <a className="dropdown-item" href="#">
                    Estadicticas
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/configuracion">
                  <a className="dropdown-item" href="#">
                    Configuración del jackpot
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <h1 className="title-top-dash-hour">14:23:00 PM</h1>

          <NotComp />

          <div className="button-top-nav">
            <button className="btn-nav-header btn-nav-header-span">
              Actualización - 10min
            </button>
          </div>
        </div>
        <Slider {...settings}>
          <div>
            <BannerDash
              title="Bienvenido a tu dashboard!"
              formattedDate={formattedDate}
            />
          </div>
          <div>
            <BannerDash2
              title="Mantén un orden"
              formattedDate={formattedDate}
            />
          </div>
        </Slider>

        <div className="container container-title-dash-box">
          <h1 className="title-dash-box">
            <span className="span-title-dash-view-mobile">Administra</span> Tus
            secciones
          </h1>
          <div className="button-top-nav">
            <button className="btn-nav-header">Actualización - 10min</button>
          </div>
          <div className="container-search-dash-box">
            <input
              className="input-search-dash-box"
              type="text"
              placeholder="Buscar secciones, elementos y configurar"
            />
            <div className="container-row-img--items">
              <img
                className="img--items img-span-row-search"
                src={require('../images/search.png')}
              />
              <span className="item-img-span span-row-search"></span>
            </div>
          </div>
        </div>

        <div className="container container-dash-items-row">
          <div className="row">
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <Link to="jackpots">
                  <CompDash
                    title="Administra los jackpots"
                    text={textoJackpot}
                    textBtn="Administar"
                    img={require('../images/mon.png')}
                  />
                </Link>
              </div>
            </div>
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <Link to="players">
                  <CompDash
                    title="Administra los Players"
                    text={textoPlayer}
                    textBtn="Administar"
                    img={require('../images/user.png')}
                  />
                </Link>
              </div>
            </div>
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <Link to="estadisticas">
                  <CompDash
                    title="Ve las estadísticas"
                    text={textoEst}
                    textBtn="Visualizar"
                    img={require('../images/graf.png')}
                  />
                </Link>
              </div>
            </div>

            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <Link to="configuracion">
                  <CompDash
                    title="Configura los jackpots"
                    text={textoConfig}
                    textBtn="Configurar"
                    img={require('../images/conf.png')}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default DashboardComp;
