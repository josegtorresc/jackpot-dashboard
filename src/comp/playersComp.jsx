import React, { Fragment, useState, useEffect } from 'react';
import BannerDash from './bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import CompDash from './compDash';
import { Link } from 'react-router-dom';
import DropComp from './dropComp';
import NotComp from './notComp';
import CardAbmJackpots from './cardAbmJackpots';
import CardAbmCreatePlayers from './cardAbmCreatePlayers';
import LoadingDetailTrans from '../compsMobiles/loaderDetailTrans';
import CardPopupPlayersDetail from './cardPopupPlayersDetail';
import myAudio from '../audios/alert.mp3';
import BannerSuccess from './bannerSuccess';



function PlayersComp({ formattedDate, selectedComponent }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const [showCreateJackpot, setShowCreateJackpot] = useState(false);
  const [loadingDetailTransactions, setLoadingDetailTransactions] =
  useState(false);
  const [bannerSuccess, setBannerSuccess] = useState(false);
  const [activePlayersDetail, setActivePlayersDetail] = useState(false);




  const textoPlayer =
    'Administra a cada uno de <br /> los jugadores con clicks <br /> sencillos';
  const textoPlayerEst =
    'Accede a cada usuario <br /> y podrás ver sus<br /> estaditicas';

    const handleCreatePlayerClick = () => {
      setLoadingDetailTransactions(true);
      setShowCreateJackpot(true);
    };
    
    const handleCloseCreateJackpot = () => {
      setLoadingDetailTransactions(false);
      setShowCreateJackpot(false);
    };


    const handleOpenDetailPlayer = () => {
      setLoadingDetailTransactions(true);
      setActivePlayersDetail(true);
    };

    const showBannerSuccess = () => {
      setBannerSuccess(true);
      const audio = new Audio(myAudio);
      audio.play();
    };

    const closePopupDetailPlayers = () => {
      setActivePlayersDetail(false);
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

  return (
    <Fragment>

{loadingDetailTransactions && <LoadingDetailTrans />}

       <BannerSuccess banner={bannerSuccess} title="Configuraciones Hechas!!" />

        <CardPopupPlayersDetail
          active={activePlayersDetail}
          closePopupDetail={closePopupDetailPlayers}
          showBannerSuccess={showBannerSuccess}
        />

      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile"> (ABM) Players</span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash
            title="Administra los Players"
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

          <div className="col-md-6 col-lg-4 col-xl-4 span-players">
            <CardAbmJackpots
              img={require('../images/casino.png')}
              title="Dar de alta"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4 span-players">
            <CardAbmJackpots
              img={require('../images/cancelar.png')}
              title="Dar de baja"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4 span-players">
            <CardAbmJackpots
              img={require('../images/crear.png')}
              title="Crear Jugador"
              onClick={handleCreatePlayerClick}
            />
          </div>


          <div className="col-md-12 col-xl-6 col-lg-12">
            <div className="card-dash-items-row">
              <CompDash
                title="Administra Players"
                text={textoPlayer}
                textBtn="Administrar"
                click={handleOpenDetailPlayer}
                img={require('../images/user.png')}
              />
            </div>
          </div>
          <div className="col-md-12 col-xl-6 col-lg-12">
            <div className="card-dash-items-row">
              <CompDash
                title="Accede a sus estadísticas"
                text={textoPlayerEst}
                textBtn="Acceder"
                img={require('../images/graf.png')}
              />
            </div>
          </div>


          {showCreateJackpot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardAbmCreatePlayers onClosePopupAbm={handleCloseCreateJackpot} />
        </motion.div>
      )}


        </div>
      </div>
    </Fragment>
  );
}

export default PlayersComp;
