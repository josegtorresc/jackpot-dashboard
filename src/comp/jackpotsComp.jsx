import React, { Fragment, useState } from 'react';
import BannerDash from './bannerDash';
import CompDash from './compDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import '../styles/jackpotComp.css';

function JackpotsComp() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const [active, setActive] = useState(false);

  const handleClickJackpotTrigger = ()=>{
    setActive(true);
  };

  const textoJackpot = "Administra el trigger de <br /> de cada jackpot con clicks <br /> sencillos";
  const textoJackpotConfig = "Configura como se<br /> comportará el jackpot<br /> con pocos clicks";
  


  return (
    <Fragment>
       <div className={active ? 'container-items-popup-detail-show' : 'container-items-popup-detail'}>
          <div className='card-popup-detail'>
            <h1 className='title-card-trigger'>Administración de triggers</h1>
          </div>
        </div>
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
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        </div>

        <Slider {...settings}>
          <div>
            <BannerDash title="Administra los jackpots" />
          </div>
          <div>
            <BannerDash title="Ve las estadísticas" />
          </div>
        </Slider>
        <div className="container container-dash-items-row">
          <div className="row">
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
              <CompDash title="Administra el trigger" text={textoJackpot} textBtn="Administar" img={require("../images/mon.png")} click={handleClickJackpotTrigger}/>
              </div>
            </div>
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
              <CompDash title="Configura el jackpot" text={textoJackpotConfig} textBtn="Configurar" img={require("../images/conf.png")}/>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default JackpotsComp;
