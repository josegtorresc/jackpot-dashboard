import React, { Fragment } from 'react';
import BannerDash from './bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import CompDash from './compDash';
import { Link } from 'react-router-dom';
import DropComp from './dropComp';
import NotComp from './notComp';

function EstComp({ formattedDate }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const textoEst = 'Administra las estadísticas<br />con clicks sencillos';
  const textoEstGeneral =
    'Configura las estadisticas <br />con clisks sencillos';

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
            Dashboard -{' '}
            <span className="span-title-dash-view-mobile">
              PrometeoIT Solutions
            </span>
          </h1>
          <DropComp />
          <h1 className="title-top-dash-hour">14:23:00 PM</h1>
          <NotComp />
        </div>

        <Slider {...settings}>
          <div>
            <BannerDash
              title="Accede a las estadísticas de los jackpots"
              formattedDate={formattedDate}
            />
          </div>
          <div>
            <BannerDash
              title="Ve sus estadísticas"
              formattedDate={formattedDate}
            />
          </div>
        </Slider>
        <div className="container container-dash-items-row">
          <div className="row">
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <CompDash
                  title="Accede a las estadísticas"
                  text={textoEst}
                  textBtn="Acceder"
                  img={require('../images/graf.png')}
                />
              </div>
            </div>
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <CompDash
                  title="Configura estadísticas"
                  text={textoEstGeneral}
                  textBtn="Configurar"
                  img={require('../images/conf.png')}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default EstComp;
