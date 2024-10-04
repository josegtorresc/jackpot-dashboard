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
import CardAbmCreateMaquina from './cardAbmCreateMaquina';
import CardPopupDetailMaquinas from './cardPopupDetailMaquinas';
import '../styles/estComp.css';
import FlashMessageStatic from './flashMessageStatic';
import BannerSuccess from './bannerSuccess';
import '../styles/abmComp.css';

function AbmMaquinas({ formattedDate, selectedComponent }) {
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
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState(null);
  const [bannerAbm, setBannerAbm] = useState(false);

  useEffect(() => {
    fetchMaquinas();
    const interval = setInterval(fetchMaquinas, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get('https://jackpot-backend.vercel.app/api/maquinas');
      setMaquinas(response.data);
    } catch (error) {
      console.error('Error al obtener las máquinas:', error);
    }
  };

  const showPopupDetail = (maquina) => {
    setSelectedMaquina(maquina);
    setPopupDetail(true);
  };

  const closePopupDetailEst = () => {
    setLoadingDetailTransactions(false);
    setPopupDetail(false);
  };

  const handleCreateMaquinaClick = () => {
    setLoadingDetailTransactions(true);
    setShowCreateJackpot(true);
  };

  const handleCloseCreateJackpot = () => {
    setLoadingDetailTransactions(false);
    setShowCreateJackpot(false);
  };

  const handleActivateMaquina = (maquinaId) => {
    setMaquinas((prevMaquinas) =>
      prevMaquinas.map((maquina) =>
        maquina.id === maquinaId ? { ...maquina, active: true } : maquina,
      ),
    );
    closePopupDetailEst();
  };

  const handleDeactivateMaquina = (maquinaId) => {
    setMaquinas((prevMaquinas) =>
      prevMaquinas.map((maquina) =>
        maquina.id === maquinaId ? { ...maquina, active: false } : maquina,
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

      {popupDetail && selectedMaquina && (
        <CardPopupDetailMaquinas
          maquina={selectedMaquina}
          closePopupDetail={closePopupDetailEst}
          active={popupDetail}
          onActivate={handleActivateMaquina}
          onDeactivate={handleDeactivateMaquina}
          showBannerJackpotCreated={showBannerJackpotCreated}
        />
      )}

      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile">(ABM) Máquinas</span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash
            title="Crea, elimina y administra las máquinas"
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
              img={require('../images/maquina.png')}
              title="Dar de alta"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/maquina2.png')}
              title="Dar de baja"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/crear.png')}
              title="Crear máquina"
              onClick={handleCreateMaquinaClick}
            />
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card-items-row-transactions">
              <div className="table-container">
                {maquinas.length > 0 ? (
                  <>
                    <div className="table-header">
                      <div className="item-section-row-header">
                        <strong>ID Máquina</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Estado</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>ID Casino</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>ID Área</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Fecha</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>ID GM Manufacturer</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Base Accounting</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Número de Serie GM</strong>
                      </div>
                    </div>
                    {maquinas.map((maquina, index) => (
                      <div
                        key={index}
                        className="item-section-row-complete"
                        onClick={() => showPopupDetail(maquina)}
                      >
                        <div className="item-section-row-data">
                          <p>#{maquina.idGMFriendly}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{maquina.active ? 'Activa' : 'Inactiva'}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>#{maquina.idCasino}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>#{maquina.idArea}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{maquina.fecha}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{maquina.idGMMAnufacturer}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{maquina.baseAccounting}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{maquina.gmSerialNumber}</p>
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
          <CardAbmCreateMaquina onClosePopupAbm={handleCloseCreateJackpot} />
        </motion.div>
      )}

      <BannerSuccess banner={bannerAbm} title="Maquina Actualizada" />
    </Fragment>
  );
}

export default AbmMaquinas;
