import React, { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BannerDash from './bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DropComp from './dropComp';
import NotComp from './notComp';
import axios from 'axios';
import CardAbmCreateGruposCasinos from './cardAbmCreateGruposCasinos';
import LoadingDetailTrans from '../compsMobiles/loaderDetailTrans';
import CardAbmJackpots from './cardAbmJackpots';
import '../styles/estComp.css';
import CardPopupDetailGruposCasinos from './cardPopupDetailGruposCasinos';
import FlashMessageStatic from './flashMessageStatic';
import BannerSuccess from './bannerSuccess';

function AbmGruposCasinos({ formattedDate, selectedComponent }) {
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
  const [showCreateGrupoCasino, setShowCreateGrupoCasino] = useState(false);
  const [gruposCasinos, setGruposCasinos] = useState([]);
  const [selectedGrupoCasino, setSelectedGrupoCasino] = useState(null);
  const [bannerAbm, setBannerAbm] = useState(false);

  useEffect(() => {
    fetchGruposCasinos();
    const interval = setInterval(fetchGruposCasinos, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchGruposCasinos = async () => {
    try {
      const response = await axios.get(
        'https://jackpot-backend.vercel.app/api/grupos_casino',
      );
      setGruposCasinos(response.data);
    } catch (error) {
      console.error('Error al obtener los grupos de casinos:', error);
    }
  };

  const showPopupDetail = (grupoCasino) => {
    setSelectedGrupoCasino(grupoCasino);
    setPopupDetail(true);
  };

  const closePopupDetailEst = () => {
    setLoadingDetailTransactions(false);
    setPopupDetail(false);
  };

  const handleCreateGrupoCasinoClick = () => {
    setLoadingDetailTransactions(true);
    setShowCreateGrupoCasino(true);
  };

  const handleCloseCreateGrupoCasino = () => {
    setLoadingDetailTransactions(false);
    setShowCreateGrupoCasino(false);
  };

  const handleActivate = (gruposCasinoId) => {
    setGruposCasinos((prevGruposCasinos) =>
      prevGruposCasinos.map((casino) =>
        casino.idGrupoCasino === gruposCasinoId
          ? { ...casino, status: true }
          : casino,
      ),
    );
    closePopupDetailEst();
  };

  const handleDesactivate = (gruposCasinoId) => {
    setGruposCasinos((prevGruposCasinos) =>
      prevGruposCasinos.map((casino) =>
        casino.idGrupoCasino === gruposCasinoId
          ? { ...casino, status: false }
          : casino,
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

      {popupDetail && selectedGrupoCasino && (
        <CardPopupDetailGruposCasinos
          grupoCasino={selectedGrupoCasino}
          closePopupDetail={closePopupDetailEst}
          onActivate={handleActivate}
          onDeactivate={handleDesactivate}
          showBannerJackpotCreated={showBannerJackpotCreated}
          active={popupDetail}
        />
      )}

      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile">
            (ABM) Grupos Casinos
          </span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash
            title="Administra grupos de casinos"
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
              title="Agrupar casinos"
              onClick={handleCreateGrupoCasinoClick}
            />
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card-items-row-transactions">
              <div className="table-container">
                {gruposCasinos.length > 0 ? (
                  <>
                    <div className="table-header">
                      <div className="item-section-row-header">
                        <strong>ID Grupo Casino</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Casinos Afiliados</strong>
                      </div>
                    </div>
                    {gruposCasinos.map((grupoCasino, index) => (
                      <div
                        key={index}
                        className="item-section-row-complete"
                        onClick={() => showPopupDetail(grupoCasino)}
                      >
                        <div className="item-section-row-data">
                          <p>{grupoCasino.idGrupoCasino}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>
                            {grupoCasino.casinosAfiliados
                              .map((casino) => casino.idCasino)
                              .join(', ')}
                          </p>
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

      {showCreateGrupoCasino && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardAbmCreateGruposCasinos
            onClosePopupAbm={handleCloseCreateGrupoCasino}
          />
        </motion.div>
      )}

      <BannerSuccess banner={bannerAbm} title="Casino Actualizado" />
    </Fragment>
  );
}

export default AbmGruposCasinos;
