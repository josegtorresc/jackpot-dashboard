import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackHeaderComp from '../compsMobiles/backHeaderComp';
import TabMobile from '../compsMobiles/tabMobile';
import CardDasMobile from '../compsMobiles/cardDasMobile';
import axios from 'axios';
import '../styles/estCompMobile.css';
import EstCompMobileDetail from '../compsMobiles/estCompMobileDetail';
import FlashMessageStatic from '../comp/flashMessageStatic';
import PopupDetailValues from '../compsMobiles/popupDetailValues';

function EstCompMobile({ formattedDate }) {
  const [transactions, setTransactions] = useState([]);
  const [visibleTransactions, setVisibleTransactions] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [jackpotsValues, setJackpotsValues] = useState({
    oro: '',
    plata: '',
    bronce: '',
  });
  const [loadingJackpots, setLoadingJackpots] = useState(true);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          'https://registrosjackpots-2140153ebc74.herokuapp.com/api/transactions',
        );
        setTransactions(response.data);
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchJackpotAmounts = async () => {
      try {
        const responseOro = await axios.get(
          'https://apibackjackpots-44d7136b9d3d.herokuapp.com/api/jackpot/oro',
        );
        const responsePlata = await axios.get(
          'https://apibackjackpots-44d7136b9d3d.herokuapp.com/api/jackpot/plata',
        );
        const responseBronce = await axios.get(
          'https://apibackjackpots-44d7136b9d3d.herokuapp.com/api/jackpot/bronce',
        );

        setJackpotsValues({
          oro: responseOro.data.jackpotAmount,
          plata: responsePlata.data.jackpotAmount,
          bronce: responseBronce.data.jackpotAmount,
        });
        setLoadingJackpots(false);
      } catch (error) {
        console.error('Error al obtener los montos de los jackpots:', error);
      }
    };

    fetchJackpotAmounts();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBackToList = () => {
    setSelectedTransaction(null);
  };

  const handleCardClick = (title, text, img) => {
    setPopupContent({ title, text, img });
  };

  const handleClosePopup = () => {
    setPopupContent(null);
  };

  return (
    <div>
      <div className="container-home container-mobile-viewport-app">
        <BackHeaderComp />
        <TabMobile />
        <motion.div
          transition={{
            duration: 0.17,
            delay: 0.17,
            ease: [0.5, 0.71, 1, 1.5],
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="container-banner-absolute-detail-mobile"></div>

          <div className="container">
            <div className="container-mobile-card-banner">
              <h1 className="title-banner-mobile">
                Accede a las
                <br />
                estadisticas!!
              </h1>
              <h1 className="title-item-banner span-text-banner-date">
                {formattedDate}
              </h1>
              <h1 className="title-banner-span-copy">PrometeoIT</h1>
            </div>

            <CardDasMobile
              title="Jackpot Oro"
              text={`Balance - ${jackpotsValues.oro}`}
              textButton="Configurar"
              img={require('../images/oro.png')}
              loading={loadingJackpots}
              onClick={() =>
                handleCardClick(
                  'Jackpot Oro',
                  `Balance - ${jackpotsValues.oro}`,
                  require('../images/oro.png'),
                )
              }
            />
            <CardDasMobile
              title="Jackpot Plata"
              text={`Balance - ${jackpotsValues.plata}`}
              textButton="Configurar"
              img={require('../images/plata.png')}
              loading={loadingJackpots}
              onClick={() =>
                handleCardClick(
                  'Jackpot Plata',
                  `Balance - ${jackpotsValues.plata}`,
                  require('../images/plata.png'),
                )
              }
            />
            <CardDasMobile
              title="Jackpot Bronce"
              text={`Balance - ${jackpotsValues.bronce}`}
              textButton="Configurar"
              img={require('../images/bronce.png')}
              loading={loadingJackpots}
              onClick={() =>
                handleCardClick(
                  'Jackpot Bronce',
                  `Balance - ${jackpotsValues.bronce}`,
                  require('../images/bronce.png'),
                )
              }
            />

            <div className="container-transacciones-est-comp-mobile">
              {!selectedTransaction ? (
                <>
                  {transactions.length === 0 ? (
                    <FlashMessageStatic />
                  ) : (
                    <div>
                      <h2 className="text-transacciones-est-comp">
                        Transacciones
                      </h2>
                      {transactions
                        .slice(
                          0,
                          showAll ? transactions.length : visibleTransactions,
                        )
                        .map((transaction) => (
                          <div
                            key={transaction.transactionId}
                            className="transaction-item"
                            onClick={() => handleSelectTransaction(transaction)}
                          >
                            {transaction.transactionId}
                          </div>
                        ))}
                      {!showAll &&
                        transactions.length > visibleTransactions && (
                          <button
                            className="btn-all-transacctions-visible"
                            onClick={handleShowAll}
                          >
                            Mostrar Todas
                          </button>
                        )}
                    </div>
                  )}
                </>
              ) : (
                <EstCompMobileDetail
                  selectedTransaction={selectedTransaction}
                  handleBackToList={handleBackToList}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
      {popupContent && (
        <PopupDetailValues
          title={popupContent.title}
          text={popupContent.text}
          img={popupContent.img}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default EstCompMobile;
