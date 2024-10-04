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
import CardAbmCreate from './cardAbmCreate';
import '../styles/estComp.css';
import '../styles/abmComp.css';
import FlashMessageStatic from './flashMessageStatic';
import BannerSuccess from './bannerSuccess';

function AbmComp({ formattedDate, selectedComponent }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const [jackpotsValues, setJackpotsValues] = useState({
    oro: '',
    plata: '',
    bronce: '',
  });

  const [loadingDetailTransactions, setLoadingDetailTransactions] =
    useState(false);
  const [popupDetail, setPopupDetail] = useState(false);
  const [showCreateJackpot, setShowCreateJackpot] = useState(false);
  const [jackpots, setJackpots] = useState([]);
  const [selectedJackpot, setSelectedJackpot] = useState(null);
  const [bannerAbm, setBannerAbm] = useState(false);

  useEffect(() => {
    fetchJackpots();
    const interval = setInterval(fetchJackpots, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchJackpots = async () => {
    try {
      const response = await axios.get(
        'https://jackpot-backend.vercel.app/api/alljackpotscreatedregisterever',
      );
      setJackpots(response.data);
    } catch (error) {
      console.error('Error al obtener los jackpots:', error);
    }
  };

  const showPopupDetail = (jackpot) => {
    setSelectedJackpot(jackpot);
    setPopupDetail(true);
  };

  const closePopupDetailEst = () => {
    setLoadingDetailTransactions(false);
    setPopupDetail(false);
  };

  const handleCreateJackpotClick = () => {
    setLoadingDetailTransactions(true);
    setShowCreateJackpot(true);
  };

  const handleCloseCreateJackpot = () => {
    setLoadingDetailTransactions(false);
    setShowCreateJackpot(false);
  };

  const handleDeactivateJackpot = (jackpotId) => {
    setJackpots((prevJackpots) =>
      prevJackpots.map((jackpot) =>
        jackpot.idAutomatico === jackpotId
          ? { ...jackpot, active: false }
          : jackpot,
      ),
    );
    closePopupDetailEst();
  };

  const handleActivateJackpot = (jackpotId) => {
    setJackpots((prevJackpots) =>
      prevJackpots.map((jackpot) =>
        jackpot.idAutomatico === jackpotId
          ? { ...jackpot, active: true }
          : jackpot,
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

      {popupDetail && selectedJackpot && (
        <CardPopupDetail
          jackpot={selectedJackpot}
          closePopupDetail={closePopupDetailEst}
          active={popupDetail}
          onDeactivate={handleDeactivateJackpot}
          showBannerJackpotCreated={showBannerJackpotCreated}
          onActivate={handleActivateJackpot}
        />
      )}

      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile">(ABM) Jackpots</span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash
            title="Crea, elimina y administra los jackpots"
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
              img={require('../images/mon.png')}
              title="Dar de alta"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/cancelar.png')}
              title="Dar de baja"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/crear.png')}
              title="Crear jackpot"
              onClick={handleCreateJackpotClick}
            />
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card-items-row-transactions">
              <div className="table-container">
                {jackpots.length > 0 ? (
                  <>
                    <div className="table-header">
                      <div className="item-section-row-header">
                        <strong>ID Maquina</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Estado</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>ID Casino</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>ID Jackpot</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Monto Inicial</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Nombre</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Trigger</strong>
                      </div>
                    </div>
                    {jackpots.map((jackpot, index) => (
                      <div
                        key={index}
                        className="item-section-row-complete"
                        onClick={() => showPopupDetail(jackpot)}
                      >
                        <div className="item-section-row-data">
                          <p>#{jackpot.idMaquina}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{jackpot.active ? 'Activo' : 'Inactivo'}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>#{jackpot.idCasino}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>#{jackpot.id}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{jackpot.amount}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{jackpot.nombre}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{jackpot.maxAmount}</p>
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
      </div>

      {showCreateJackpot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardAbmCreate
            onClosePopupAbm={handleCloseCreateJackpot}
            showBannerJackpotCreated={showBannerJackpotCreated}
          />
        </motion.div>
      )}

      <BannerSuccess banner={bannerAbm} title="Jackpot Actualizado" />
    </Fragment>
  );
}

export default AbmComp;
