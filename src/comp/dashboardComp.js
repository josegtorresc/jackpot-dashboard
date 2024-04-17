import React from 'react';
import BannerDash from '../comp/bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

function DashboardComp() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  return (
    <div>
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
            Dashboard - PrometeoIT Solutions
          </h1>
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
                <a className="dropdown-item" href="#">
                  Jackpots
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Players - Jugadores
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Estadicticas
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Configuración
                </a>
              </li>
            </ul>
          </div>
          <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        </div>
        <Slider {...settings}>
          <div>
            <BannerDash title="Bienvenido a tu dashboard!" />
          </div>
          <div>
            <BannerDash title="Mantén un orden" />
          </div>
        </Slider>

        <div className="container container-dash-items-row">
          <div className="row">
            <div className="col-md-6 col-xl-6 col-lg-6">
              <div className="card-dash-items-row"></div>
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6">
              <div className="card-dash-items-row"></div>
            </div>
            <div className="col-md-12 col-xl-12 col-lg-12">
              <div className="card-dash-items-row"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardComp;
