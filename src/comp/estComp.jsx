import React, { Fragment, useEffect, useState, useRef } from 'react';
import BannerDash from './bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import DropComp from './dropComp';
import NotComp from './notComp';
import CardEstBalance from './cardEstBalance';
import '../styles/estComp.css';
import axios from 'axios';
import CardPopupEstComp from './cardPopupEstComp';
import FlashMessageStatic from './flashMessageStatic';
import { ClipLoader, RingLoader } from 'react-spinners';
import PopupJackpots from './popupJackpots';
import LoadingDetailTrans from '../compsMobiles/loaderDetailTrans';
import LoadingEstJackpots from './loadingEstJackpots';

function EstComp({ formattedDate, selectedComponent }) {
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

  const [popupDetail, setPopupDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingJackpots, setLoadingJackpots] = useState(true);
  const [selectedJackpot, setSelectedJackpot] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loadingDetailTransactions, setLoadingDetailTransactions] =
    useState(false);
  const [jackpots, setJackpots] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const fetchJackpots = async () => {
      try {
        const response = await axios.get(
          'https://jackpot-backend.vercel.app/api/alljackpotscreated',
        );
        setJackpots(response.data || []);
        setLoadingJackpots(false);
      } catch (error) {
        console.error('Error al obtener los jackpots:', error);
      }
    };

    fetchJackpots();
  }, []);

  const handleCardClick = (jackpot) => {
    setSelectedJackpot(jackpot);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedJackpot(null);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          'https://jackpot-backend.vercel.app/api/transactions',
        );
        setTransactions(response.data || []); 
        setLoadingTransactions(false);
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
      }
    };

    fetchTransactions();

    const intervalId = setInterval(fetchTransactions, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const showPopupDetail = (transaction) => {
    setLoadingDetailTransactions(true);
    setSelectedTransaction(transaction);
    setPopupDetail(true);
  };

  const closePopupDetailEst = () => {
    setLoadingDetailTransactions(false);
    setPopupDetail(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (!transaction) {
      return false; 
    }
  
    if (transaction.creditsWagered !== undefined) {
      const playerExists = transaction.player && transaction.player.firstName && transaction.player.lastName;
      return playerExists && (
        transaction.player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.player.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    return Object.values(transaction || {}).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const jackpotWinners = transactions.filter((transaction) =>
    transaction.jackpotsWon && Object.keys(transaction.jackpotsWon).some((jackpot) => {
      const amountWon = transaction.jackpotsWon[jackpot];
      return amountWon > 200;
    })
  );

  return (
    <Fragment>
      {loadingDetailTransactions && (
        <LoadingDetailTrans
          jackpot={selectedJackpot}
          onClose={handleClosePopup}
        />
      )}

      {isPopupVisible && (
        <PopupJackpots jackpot={selectedJackpot} onClose={handleClosePopup} />
      )}

      <CardPopupEstComp
        popupDetail={popupDetail}
        closePopupDetailEst={closePopupDetailEst}
        transaction={selectedTransaction}
      />
      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile">
            Estadisticas y operaciones
          </span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash
            title="Estadísticas de los jackpots"
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
      <div className="container container-dash-items-row span-container-jackpots-all-est-comp">
        <div className="row">
          <div className="container">
            <div
              className="row span-container-flex"
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {loadingJackpots ? (
                <LoadingEstJackpots />
              ) : jackpots.length === 0 ? (
                <LoadingEstJackpots />
              ) : (
                jackpots.map((jackpot, index) => (
                  <div key={index} className="col-md-12 col-lg-6 col-xl-5">
                    <CardEstBalance
                      img={require(`../images/mon.png`)}
                      textJackpot={
                        jackpot.nombre.charAt(0).toUpperCase() +
                        jackpot.nombre.substring(1).toLowerCase()
                      }
                      balanceJackpot={jackpot.amount}
                      loading={loadingJackpots}
                      onClick={() => handleCardClick(jackpot)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="container container-graf-row">
            <div className="row">
              <div className="col-md-6">
                <div className="card-graf">
                  <div>
                    <img
                      className="img-graf-row-est"
                      src={require('../images/transaccion.png')}
                      alt="moneda"
                    />
                  </div>
                  <div>
                    <h1 className="title-graf-row-est">N° Transacciones</h1>
                  </div>
                  <div className="container-title-est-row-graf">
                    {loadingTransactions ? (
                      <ClipLoader color="orange" size={30} />
                    ) : (
                      <h1 className="title-est-row-graf">
                        {transactions.length}
                      </h1>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card-graf">
                  <div>
                    <input
                      className="input-row-graf-est"
                      type="text"
                      placeholder="Buscar transacciones"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <img
                      className="img-graf-row-est"
                      src={require('../images/conf.png')}
                      alt="moneda"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card-items-row-transactions">
              {filteredTransactions.length === 0 ? (
                <FlashMessageStatic />
              ) : (
                <div className="table-container">
                  <div className="table-header">
                    <div className="item-section-row-header">
                      <strong>Fecha Transacción</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>ID jugador</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>ID Máquina</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>Locación</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>Apuesta</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>ID Operación</strong>
                    </div>
                  </div>
              
                {filteredTransactions.map((transaction) => (
  transaction && transaction.creditsWagered !== undefined ? (
    <div 
      className="item-section-row-complete" 
      key={transaction.id} 
      onClick={() => showPopupDetail(transaction)}
    >
      <div className="item-section-row-data">
        <strong>ID Transacción:</strong>
        <p>{transaction.id ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <strong>Apuesta:</strong>
        <p>{transaction.creditsWagered ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <strong>Ganancias:</strong>
        <p>{transaction.winnings ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <strong>Jugador:</strong>
        <p>{transaction.player ? `${transaction.player.firstName} ${transaction.player.lastName}` : 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <strong>Nivel Jugador:</strong>
        <p>{transaction.player?.level ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <strong>ID Máquina:</strong>
        <p>{transaction.gamingMachine?.id ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <strong>Modelo Máquina:</strong>
        <p>{transaction.gamingMachine?.modelId ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <strong>Fecha Transacción:</strong>
        <p>{transaction.timeStamp ? new Date(transaction.timeStamp).toLocaleString() : 'No disponible'}</p>
      </div>
    </div>
  ) : (
    <div 
      className="item-section-row-complete" 
      key={transaction.transactionId} 
      onClick={() => showPopupDetail(transaction)}
    >
      <div className="item-section-row-data">
        <p>{transaction.timestamp ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <p>{transaction.playerId ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <p>{transaction.ip ?? 'No disponible'}</p>
      </div>
      
      <div className="item-section-row-data">
        <p>{transaction.timeZone ?? 'No disponible'}</p>
      </div>
      <div className="item-section-row-data">
        <p>${transaction.betAmount ?? '0.00'}</p>
      </div>
      <div className="item-section-row-data">
        <p>{transaction.transactionId ?? 'No disponible'}</p>
      </div>
    </div>
  )
))}

              </div>
              
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EstComp;
