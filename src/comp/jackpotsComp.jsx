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
import CardPopupJackpots from './cardPopupJackpots';
import CardPopupJackpotsConfig from './cardPopupJackpotsConfig';
import CardPopupJackpotsTriggersValues from './cardPopupJackpotsTriggerValues';
import CardPopupJackpots2 from './cardPopupJackpots2';

function JackpotsComp({ formattedDate, selectedComponent }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const [active, setActive] = useState(false);
  const [activeTriggerValues, setActiveTriggerValues] = useState(false);
  const [bannerSuccess, setBannerSuccess] = useState(false);

  const [activeConfig, setActiveConfig] = useState(false);
  const [bannerSuccessConfig, setBannerSuccessConfig] = useState(false);

  const showBannerSuccess = () => {
    setBannerSuccess(true);
    const audio = new Audio(myAudio);
    audio.play();
  };

  const showBannerSuccessConfig = () => {
    setBannerSuccessConfig(true);
    const audio = new Audio(myAudio);
    audio.play();
  };

  const hideBannerSuccess = () => {
    setBannerSuccess(false);
  };

  const handleClickJackpotTrigger = () => {
    setActive(true);
  };

  const handleClickJackpotTriggerValues = () => {
    setActiveTriggerValues(true);
  };

  const handleClickJackpotConfig = () => {
    setActiveConfig(true);
  };

  const closePopupDetail = () => {
    setActive(false);
  };

  const closePopupDetailConfig = () => {
    setActiveConfig(false);
  };

  const closePopupDetailTriggerValues = () => {
    setActiveTriggerValues(false);
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

  useEffect(() => {
    let timeout;
    if (bannerSuccessConfig) {
      timeout = setTimeout(() => {
        setBannerSuccessConfig(false);
      }, 3000);
    } else {
      setBannerSuccessConfig(false);
    }

    return () => clearTimeout(timeout);
  }, [bannerSuccessConfig]);

  const textoJackpot =
    'Administra los montos <br /> de cada jackpot con clicks <br /> sencillos';
  const textoJackpotTrigger =
    'Administra los triggers <br /> de cada jackpot con clicks <br /> sencillos';
  const textoJackpotConfig =
    'Configura como se<br /> comportará el jackpot<br /> con pocos clicks';

  return (
    <Fragment>
      <div className="container-web-viewport">
        <BannerSuccess banner={bannerSuccess} title="Jackpot actualizado!!" />

        <BannerSuccess
          banner={bannerSuccessConfig}
          title="Configuraciones hechas!!"
        />

        <CardPopupJackpots2
          active={active}
          closePopupDetail={closePopupDetail}
          showBannerSuccess={showBannerSuccess}
        />

        <CardPopupJackpotsTriggersValues
          active={activeTriggerValues}
          closePopupDetail={closePopupDetailTriggerValues}
          showBannerSuccess={showBannerSuccess}
        />

        <CardPopupJackpotsConfig
          activeConfig={activeConfig}
          closePopupDetailConfig={closePopupDetailConfig}
          showBannerSuccessConfig={showBannerSuccessConfig}
        />

        <div className="container-title-top-dash-general">
          <h1 className="title-top-dash-general">
            Dashboard -{' '}
            <span className="span-title-dash-view-mobile">(ADM) Jackpots</span>
          </h1>
          <DropComp selectedComponent={selectedComponent} />
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
                  title="Administra los montos"
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
                  title="Configura los Jackpots"
                  text={textoJackpotTrigger}
                  textBtn="Configurar"
                  img={require('../images/conf.png')}
                  click={handleClickJackpotConfig}
                />
              </div>
            </div>
            <div className="col-md-12 col-xl-6 col-lg-12">
              <div className="card-dash-items-row">
                <CompDash
                  title="Administra los triggers"
                  text={textoJackpotConfig}
                  textBtn="Administrar"
                  img={require('../images/ganador.png')}
                  click={handleClickJackpotTriggerValues}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default JackpotsComp;
