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
import CardAbmCreateGruposMaquinas from './cardAbmCreateGruposMaquinas';
import CardPopupDetailGruposMaquinas from './cardPopupDetailGruposMaquinas';
import FlashMessageStatic from './flashMessageStatic';

function AbmGruposMaquinas({ formattedDate, selectedComponent }) {
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
  const [gruposMaquinas, setGruposMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState(null);

  useEffect(() => {
    fetchMaquinas();
    const interval = setInterval(fetchMaquinas, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get(
        'https://jackpot-backend.vercel.app/api/grupos_maquinas',
      );
      setGruposMaquinas(response.data);
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

  const handleDeactivateMaquina = (maquinaId) => {
    setGruposMaquinas((prevMaquinas) =>
      prevMaquinas.map((maquina) =>
        maquina.idGrupoMaquina === maquinaId
          ? { ...maquina, status: false }
          : maquina,
      ),
    );
    closePopupDetailEst();
  };

  return (
    <Fragment>
      {loadingDetailTransactions && <LoadingDetailTrans />}

      {popupDetail && selectedMaquina && (
        <CardPopupDetailGruposMaquinas
          grupoMaquinas={selectedMaquina}
          closePopupDetail={closePopupDetailEst}
          active={popupDetail}
          onDeactivate={handleDeactivateMaquina}
        />
      )}

      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile">
            (ABM) Grupos Máquinas
          </span>
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
              title="Agrupar máquinas"
              onClick={handleCreateMaquinaClick}
            />
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card-items-row-transactions">
              {gruposMaquinas.length > 0 ? (
                gruposMaquinas.map((maquina, index) => (
                  <div
                    key={index}
                    className="item-section-row-complete"
                    onClick={() => showPopupDetail(maquina)}
                  >
                    <strong>ID Grupo Maquina</strong>
                    <p>{maquina.idGrupoMaquina}</p>
                    <strong>Filtros de maquinas (Maquinas afiliadas)</strong>
                    <p>
                      {maquina.maquinasAfiliadas
                        .map((maquina) => maquina.idGMFriendly)
                        .join(', ')}
                    </p>
                  </div>
                ))
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
          <CardAbmCreateGruposMaquinas
            onClosePopupAbm={handleCloseCreateJackpot}
          />
        </motion.div>
      )}
    </Fragment>
  );
}

export default AbmGruposMaquinas;
