import React, { Fragment, useState } from 'react';
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
import CardReportComp from './cardReportComp';

function ConfigComp({ formattedDate, selectedComponent }) {
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

  setTimeout(hideBannerSuccess, 2500);

  const handleClickJackpotTrigger = () => {
    setActive(true);
  };

  const closePopupDetail = () => {
    setActive(false);
  };

  const textoJackpot =
    'Administra el trigger de <br /> de cada jackpot con clicks <br /> sencillos';
  const textoJackpotConfig =
    'Reporta como se<br /> comportará el jackpot<br /> con pocos clicks';

  return (
    <Fragment>
      <BannerSuccess banner={bannerSuccess} title="Jackpot actualizado!!" />
      <CardReportComp active={active} closePopupDetail={closePopupDetail} />

      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile">
            (ADM) Configuraciones
          </span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash
            title="Configura lo que necesites"
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
                title="Genera un reporte"
                text={textoJackpotConfig}
                textBtn="Configurar"
                img={require('../images/repor.png')}
                click={handleClickJackpotTrigger}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfigComp;
