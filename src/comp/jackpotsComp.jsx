import React, { Fragment, useEffect, useState } from 'react';
import BannerDash from './bannerDash';
import CompDash from './compDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import '../styles/jackpotComp.css';
import BannerSuccess from './bannerSuccess';
import myAudio from '../audios/alert.mp3';
import { Link } from 'react-router-dom';
import DropComp from './dropComp';
import NotComp from './notComp';

function JackpotsComp({ formattedDate }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const [active, setActive] = useState(false);
  const [bannerSuccess, setBannerSuccess] = useState(false);

  const showBannerSuccess = () => {
    setBannerSuccess(true);
    const audio = new Audio(myAudio);
    audio.play();
  };

  const hideBannerSuccess = () => {
    setBannerSuccess(false);
  };

  const handleClickJackpotTrigger = () => {
    setActive(true);
  };

  const closePopupDetail = () => {
    setActive(false);
  };

  useEffect(() => {
    let timeout;
    if (bannerSuccess) {
      timeout = setTimeout(() => {
        setBannerSuccess(false);
      }, 3000);
    } else {
      setBannerSuccess(false);
    }

    return () => clearTimeout(timeout);
  }, [bannerSuccess]);

  const textoJackpot =
    'Administra el trigger de <br /> de cada jackpot con clicks <br /> sencillos';
  const textoJackpotConfig =
    'Configura como se<br /> comportará el jackpot<br /> con pocos clicks';

  return (
    <Fragment>
      <BannerSuccess banner={bannerSuccess} title="Jackpot actualizado!!" />
      <div
        className={`container-items-popup-detail-show ${
          active ? '' : 'container-items-popup-detail'
        }`}
      >
        <div className="card-popup-detail">
          <img
            className="img-close-popup-deatil"
            src={require('../images/close.png')}
            alt="close"
            onClick={closePopupDetail}
          />
          <h1 className="title-card-trigger">Administración de triggers</h1>
          <div className="row-jackpot-value">
            <h1 className="title-jackpot-row-value">Jackpot oro</h1>
            <input
              className="input-row-value-jackpot"
              type="text"
              placeholder="Valor oro 1200"
            />
          </div>
          <div className="row-jackpot-value">
            <h1 className="title-jackpot-row-value">Jackpot plata</h1>
            <input
              className="input-row-value-jackpot"
              type="text"
              placeholder="Valor plata 750"
            />
          </div>
          <div className="row-jackpot-value">
            <h1 className="title-jackpot-row-value">Jackpot bronce</h1>
            <input
              className="input-row-value-jackpot"
              type="text"
              placeholder="Valor bronce 500"
            />
          </div>

          <div className="row-jackpot-value">
            <button
              className="btn-row-jackpot-actualization-value"
              onClick={showBannerSuccess}
            >
              Actualizar valores
            </button>
          </div>
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
              title="Administra los jackpots"
              formattedDate={formattedDate}
            />
          </div>
          <div>
            <BannerDash
              title="Ve las estadísticas"
              formattedDate={formattedDate}
            />
          </div>
        </Slider>
        <div className="container container-dash-items-row">
          <div className="row">
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <CompDash
                  title="Administra el trigger"
                  text={textoJackpot}
                  textBtn="Administar"
                  img={require('../images/mon.png')}
                  click={handleClickJackpotTrigger}
                />
              </div>
            </div>
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <CompDash
                  title="Configura el jackpot"
                  text={textoJackpotConfig}
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

export default JackpotsComp;
