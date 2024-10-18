import React, { Fragment, useState, useEffect } from 'react';
import BannerDash from './bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import CompDash from './compDash';
import DropComp from './dropComp';
import NotComp from './notComp';
import CardAbmJackpots from './cardAbmJackpots';
import CardAbmCreatePlayers from './cardAbmCreatePlayers';
import LoadingDetailTrans from '../compsMobiles/loaderDetailTrans';
import CardPopupPlayersDetail from './cardPopupPlayersDetail';
import myAudio from '../audios/alert.mp3';
import BannerSuccess from './bannerSuccess';
import CardPopupPlayersLevels from './cardPopupPlayersLevels';
import axios from 'axios';
import CardPopupDetailPlayersList from './cardPopupDetailPlayersList';

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
  const [loadingDetailTransactions, setLoadingDetailTransactions] = useState(false);
  const [bannerSuccess, setBannerSuccess] = useState(false);
  const [activePlayersDetail, setActivePlayersDetail] = useState(false);
  const [activePlayersLevels, setActivePlayersLevels] = useState(false);
  const [activePlayersDetailList, setActivePlayersDetailList] = useState(false);
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]); // Filtrado
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo para el término de búsqueda

  const textoPlayer = 'Administra a cada uno de <br /> los jugadores con clicks <br /> sencillos';
  const textoPlayerEst = 'Crea niveles que podrán<br /> ser asignados';

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('https://jackpot-backend.vercel.app/api/players');
      setPlayers(response.data);
      setFilteredPlayers(response.data); 
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = players.filter((player) => {
      const { idPlayer, username, nivel, status } = player;
      return (
        idPlayer.toLowerCase().includes(searchValue) ||
        username.toLowerCase().includes(searchValue) ||
        (nivel && nivel.toLowerCase().includes(searchValue)) ||
        status.toLowerCase().includes(searchValue)
      );
    });
    setFilteredPlayers(filtered);
  };

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

  const handleOpenPlayersLevels = () => {
    setLoadingDetailTransactions(true);
    setActivePlayersLevels(true);
  };

  const handleClosePlayerList = () => {
    setActivePlayersDetailList(false);
  };

  const closePopupPlayersLevels = () => {
    setActivePlayersLevels(false);
    setLoadingDetailTransactions(false);
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

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setActivePlayersDetailList(true);
    setLoadingDetailTransactions(true);
  };

  return (
    <Fragment>
      {loadingDetailTransactions && <LoadingDetailTrans />}

      <BannerSuccess banner={bannerSuccess} title="Configuraciones Hechas!!" />
      <CardPopupDetailPlayersList
        active={activePlayersDetailList}
        closePopupDetail={handleClosePlayerList}
        showBannerPlayerUpdated={showBannerSuccess}
        player={selectedPlayer}
      />

      <CardPopupPlayersDetail
        active={activePlayersDetail}
        closePopupDetail={closePopupDetailPlayers}
        showBannerSuccess={showBannerSuccess}
      />

      <CardPopupPlayersLevels
        active={activePlayersLevels}
        closePopupDetail={closePopupPlayersLevels}
        showBannerSuccess={showBannerSuccess}
      />

      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard - <span className="span-title-dash-view-mobile"> (ABM) Players</span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash title="Administra los Players" formattedDate={formattedDate} />
        </div>
        <div>
          <BannerDash title="Ve sus estadísticas" formattedDate={formattedDate} />
        </div>
      </Slider>

      <div className="container container-dash-items-row">
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-4 span-players">
            <CardAbmJackpots img={require('../images/casino.png')} title="Dar de alta" />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4 span-players">
            <CardAbmJackpots img={require('../images/cancelar.png')} title="Dar de baja" />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4 span-players">
            <CardAbmJackpots img={require('../images/crear.png')} title="Crear Jugador" onClick={handleCreatePlayerClick} />
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
                title="Crea niveles a los players"
                text={textoPlayerEst}
                textBtn="Acceder"
                click={handleOpenPlayersLevels}
                img={require('../images/graf.png')}
              />
            </div>
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12  span-table-players">
            <div className="card-items-row-transactions">
              <div className="table-container">
                <div className="table-header">
                  {/* Input para búsqueda */}
                  <input
                    type="text"
                    placeholder="Buscar por cualquier atributo"
                    className="input-row-value-jackpot"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <p>{`Total de jugadores: ${filteredPlayers.length}`}</p> {/* Contador dinámico */}
                </div>

                {filteredPlayers.length > 0 ? (
                  <>
                    <div className="table-header">
                      <div className="item-section-row-header">
                        <strong>ID Player</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Username</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Nivel</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Status</strong>
                      </div>
                    </div>

                    {filteredPlayers.map((player) => (
                      <div
                        key={player.idPlayer}
                        className="item-section-row-complete"
                        onClick={() => handlePlayerClick(player)}
                      >
                        <div className="item-section-row-data">
                          <p>{player.idPlayer}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{player.username}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{player.nivel}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{player.status}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No players available</p>
                )}
              </div>
            </div>
          </div>

          {showCreateJackpot && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <CardAbmCreatePlayers onClosePopupAbm={handleCloseCreateJackpot} />
            </motion.div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default PlayersComp;
