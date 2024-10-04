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
import { css } from '@emotion/react';
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

  const textoEst = 'Administra las estadísticas<br />con clicks sencillos';
  const textoEstGeneral =
    'Configura las estadísticas <br />con clicks sencillos';

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
        setJackpots(response.data);
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
        const newTransactions = response.data;
        setTransactions(newTransactions);
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

  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const jackpotWinners = transactions.filter((transaction) =>
    Object.keys(transaction.jackpotsWon).some((jackpot) => {
      const amountWon = transaction.jackpotsWon[jackpot];
      return amountWon > 200;
    }),
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
                      <strong>Atribución Jackpot</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>Locación</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>Atribución</strong>
                    </div>
                    <div className="item-section-row-header">
                      <strong>ID Operación</strong>
                    </div>
                  </div>
                  {filteredTransactions.map((transaction) => (
                    <div
                      className="item-section-row-complete"
                      key={transaction.transactionId}
                      onClick={() => showPopupDetail(transaction)}
                    >
                      <div className="item-section-row-data">
                        <p>{transaction.timestamp}</p>
                      </div>
                      <div className="item-section-row-data">
                        <p>{transaction.playerId}</p>
                      </div>
                      <div className="item-section-row-data">
                        <p>{transaction.ip}</p>
                      </div>
                      <div className="item-section-row-data">
                        {transaction.jackpotsWon &&
                          Object.entries(transaction.jackpotsWon).map(
                            ([jackpotName, amount]) => (
                              <p key={jackpotName}>
                                {jackpotName.charAt(0).toUpperCase() +
                                  jackpotName.slice(1)}
                                : ${amount}
                              </p>
                            ),
                          )}
                      </div>
                      <div className="item-section-row-data">
                        <p>{transaction.timeZone}</p>
                      </div>
                      <div className="item-section-row-data">
                        <p>${transaction.totalAmountWon}</p>
                      </div>
                      <div className="item-section-row-data">
                        <p>{transaction.transactionId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="container container-graf-row span-container-est-of">
            <div className="row">
              <div className="col-md-6">
                <div className="card-graf">
                  <div>
                    <img
                      className="img-graf-row-est"
                      src={require('../images/mon.png')}
                      alt="moneda"
                    />
                  </div>
                  <div>
                    <h1 className="title-graf-row-est">Atribuciones Hoy</h1>
                  </div>
                  <div className="container-title-est-row-graf">
                    {loadingTransactions ? (
                      <ClipLoader color="orange" size={30} />
                    ) : (
                      <h1 className="title-est-row-graf span-text-atrb-tod">
                        <RingLoader color={'orange'} size={45} />
                      </h1>
                    )}
                  </div>
                </div>
              </div>

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
                    <h1 className="title-graf-row-est">Operaciones Hoy</h1>
                  </div>
                  <div className="container-title-est-row-graf">
                    {loadingTransactions ? (
                      <ClipLoader color="orange" size={30} />
                    ) : (
                      <RingLoader color={'orange'} size={45} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="title-jackpots-winners">Listado de ganadores </h1>
          <img
            className="img-list-winners"
            src={require('../images/winners.png')}
            alt="winner"
          />

          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card-items-row-transactions span-list-winners-est">
              {jackpotWinners.length === 0 ? (
                <FlashMessageStatic />
              ) : (
                jackpotWinners.map((transaction) => (
                  <div
                    className="item-section-row-complete"
                    key={transaction.transactionId}
                    onClick={() => showPopupDetail(transaction)}
                  >
                    <strong>Fecha:</strong>
                    <p>{transaction.timestamp}</p>
                    <strong>ID jugador:</strong>
                    <p>{transaction.playerId}</p>
                    <strong>ID Máquina:</strong>
                    <p>{transaction.ip}</p>
                    {transaction.jackpotsWon &&
                      Object.entries(transaction.jackpotsWon).map(
                        ([jackpotName, amount]) => (
                          <React.Fragment key={jackpotName}>
                            <strong>Atribución Jackpot:</strong>
                            <p>
                              {jackpotName.charAt(0).toUpperCase() +
                                jackpotName.slice(1)}
                              : ${amount}
                            </p>
                          </React.Fragment>
                        ),
                      )}
                    <strong>Locación:</strong>
                    <p>{transaction.timeZone}</p>
                    <strong>Atribución:</strong>
                    <p>${transaction.totalAmountWon}</p>
                    <strong>Apuesta:</strong>
                    <p>${transaction.betAmount}</p>
                    <strong>ID Operación:</strong>
                    <p>{transaction.transactionId}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EstComp;
