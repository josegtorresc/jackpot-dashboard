import React, { Fragment } from 'react';
import '../styles/cardPopupEstComp.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CardPopupEstComp({ popupDetail, closePopupDetailEst, transaction }) {
  if (!popupDetail || !transaction) {
    return null;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Detalles de la Transacción', 10, 10);

    const tableColumn = ['Atributo', 'Valor'];
    const tableRows = [];

    Object.keys(transaction).forEach((key) => {
      if (key === 'jackpotsWon') {
        Object.entries(transaction.jackpotsWon).forEach(
          ([jackpotName, amount]) => {
            tableRows.push([`Jackpot Ganado: ${jackpotName}`, amount]);
          },
        );
      } else {
        tableRows.push([key, transaction[key]]);
      }
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`transaccion_${transaction.transactionId}.pdf`);
  };

  const renderJackpotsWon = (jackpotsWon) => {
    return Object.entries(jackpotsWon).map(([jackpotName, amount]) => (
      <div key={jackpotName} className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">
          {jackpotName.charAt(0).toUpperCase() + jackpotName.slice(1)}:
        </h1>
        <p className="text-row-mobile-jackpot">${amount}</p>
      </div>
    ));
  };

  return (
    <Fragment>
      <div
        className={`container-popup-est-comp-data-show ${
          popupDetail ? '' : 'container-popup-est-comp-data'
        }`}
      >
        <div className="card-popup-est-comp-data">
          <img
            src={require('../images/des.png')}
            className="generate-pdf-button"
            onClick={generatePDF}
            alt="descargar"
          />
          <img
            className="img-close-poup-est-comp-data"
            src={require('../images/close-white.png')}
            alt="Cerrar"
            onClick={closePopupDetailEst}
          />
          <div className="banner-color-popup-detail">
            <h1 className="title-banner-color-popup-detail">
              Detalle de transacción
            </h1>
          </div>
          <div className="card-inside-popup-detail">
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Fecha y Hora:</h1>
              <p className="text-row-mobile-jackpot">{transaction.timestamp}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID jugador:</h1>
              <p className="text-row-mobile-jackpot">{transaction.playerId}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Nombre de Usuario:</h1>
              <p className="text-row-mobile-jackpot">{transaction.username}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Nivel del jugador:</h1>
              <p className="text-row-mobile-jackpot">
                {transaction.nivel}
              </p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Máquina:</h1>
              <p className="text-row-mobile-jackpot">{transaction.ip}</p>
            </div>
             {/* 
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Atribución:</h1>
              <p className="text-row-mobile-jackpot">
                ${transaction.totalAmountWon}
              </p>
            </div>
            */}
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Apuesta:</h1>
              <p className="text-row-mobile-jackpot">
                ${transaction.totalAmountWon}
              </p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Operación:</h1>
              <p className="text-row-mobile-jackpot">
                {transaction.transactionId}
              </p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Locación / Casino:</h1>
              <p className="text-row-mobile-jackpot">{transaction.timeZone}</p>
            </div>
            {/*
            <h1 className="title-row-mobile-jackpot">
              Atribuciones a los jackpots
            </h1>
            {transaction.jackpotsWon &&
              renderJackpotsWon(transaction.jackpotsWon)}
               */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardPopupEstComp;
