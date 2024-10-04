import React, { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BannerDash from './bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DropComp from './dropComp';
import NotComp from './notComp';
import axios from 'axios';
import CardPopupDetail from './cardPopupDetail';
import CardAbmJackpots from './cardAbmJackpots';
import LoadingDetailTrans from '../compsMobiles/loaderDetailTrans';
import CardAbmCreateCasinos from './cardAbmCreateCasinos';
import '../styles/estComp.css';
import CardPopupDetailCasino from './cardPopupDetailCasino';
import FlashMessageStatic from './flashMessageStatic';
import BannerSuccess from './bannerSuccess';

function AbmCasinos({ formattedDate, selectedComponent }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const [loadingDetailTransactions, setLoadingDetailTransactions] =
    useState(false);
  const [popupDetail, setPopupDetail] = useState(false);
  const [showCreateJackpot, setShowCreateJackpot] = useState(false);
  const [casinos, setCasinos] = useState([]);
  const [selectedCasino, setSelectedCasino] = useState(null);
  const [bannerAbm, setBannerAbm] = useState(false);

  useEffect(() => {
    fetchCasinos();
    const interval = setInterval(fetchCasinos, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchCasinos = async () => {
    try {
      const response = await axios.get('https://jackpot-backend.vercel.app/api/casinos');
      setCasinos(response.data);
    } catch (error) {
      console.error('Error al obtener los casinos:', error);
    }
  };

  const showPopupDetail = (casino) => {
    setSelectedCasino(casino);
    setPopupDetail(true);
  };

  const closePopupDetailEst = () => {
    setLoadingDetailTransactions(false);
    setPopupDetail(false);
  };

  const handleCreateCasinoClick = () => {
    setLoadingDetailTransactions(true);
    setShowCreateJackpot(true);
  };

  const handleCloseCreateJackpot = () => {
    setLoadingDetailTransactions(false);
    setShowCreateJackpot(false);
  };

  const handleActivateCasino = (casinoId) => {
    setCasinos((prevCasinos) =>
      prevCasinos.map((casino) =>
        casino.idCasino === casinoId ? { ...casino, status: true } : casino,
      ),
    );
    closePopupDetailEst();
  };

  const handleDeactivateCasino = (casinoId) => {
    setCasinos((prevCasinos) =>
      prevCasinos.map((casino) =>
        casino.idCasino === casinoId ? { ...casino, status: false } : casino,
      ),
    );
    closePopupDetailEst();
  };

  const showBannerJackpotCreated = () => {
    setBannerAbm(true);
  };

  useEffect(() => {
    let timeout;
    if (bannerAbm) {
      timeout = setTimeout(() => {
        setBannerAbm(false);
      }, 3000);
    } else {
      setBannerAbm(false);
    }

    return () => clearTimeout(timeout);
  }, [bannerAbm]);

  return (
    <Fragment>
      {loadingDetailTransactions && <LoadingDetailTrans />}

      {popupDetail && selectedCasino && (
        <CardPopupDetailCasino
          casino={selectedCasino}
          closePopupDetail={closePopupDetailEst}
          active={popupDetail}
          onActivate={handleActivateCasino}
          onDeactivate={handleDeactivateCasino}
          showBannerJackpotCreated={showBannerJackpotCreated}
        />
      )}

      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile">(ABM) Casinos</span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash
            title="Crea, elimina y administra los casinos"
            formattedDate={formattedDate}
          />
        </div>
        <div>
          <BannerDash title="Ve sus detalles" formattedDate={formattedDate} />
        </div>
      </Slider>

      <div className="container container-dash-items-row">
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/casino.png')}
              title="Dar de alta"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/casino2.png')}
              title="Dar de baja"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/crear.png')}
              title="Crear casino"
              onClick={handleCreateCasinoClick}
            />
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card-items-row-transactions">
              {casinos.length > 0 ? (
                <>
                  <div className="table-header">
                    <div className="item-section-row-header">
                      <strong>ID Casino</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>Ubicación</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>País</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>Ciudad</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>Estado</strong>
                    </div>
                  </div>
                  {casinos.map((casino, index) => (
                    <div
                      key={index}
                      className="item-section-row-complete"
                      onClick={() => showPopupDetail(casino)}
                    >
                      <div className="item-section-row-data">
                        <p>{casino.idCasino}</p>
                      </div>
                      <div className="item-section-row-data">
                        <p>{casino.ubicacion}</p>
                      </div>
                      <div className="item-section-row-data">
                        <p>{casino.pais}</p>
                      </div>
                      <div className="item-section-row-data">
                        <p>{casino.ciudad}</p>
                      </div>
                      <div className="item-section-row-data">
                        <p>{casino.status}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <FlashMessageStatic />
              )}
            </div>
          </div>
        </div>
      </div>

      {showCreateJackpot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardAbmCreateCasinos onClosePopupAbm={handleCloseCreateJackpot} />
        </motion.div>
      )}
      <BannerSuccess banner={bannerAbm} title="Casino Actualizado" />
    </Fragment>
  );
}

export default AbmCasinos;
