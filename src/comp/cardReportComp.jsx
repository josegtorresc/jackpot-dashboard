import React, { Fragment, useState, useEffect } from 'react';
import '../styles/cardReportComp.css';
import BannerSuccess from './bannerSuccess';

function CardReportComp({ active, closePopupDetail, showBannerSuccess }) {
  const [userName, setUserName] = useState('');
  const [report, setReport] = useState('');
  const [bannerSuccess, setBannerSuccess] = useState(false);

  const handleSubmit = async () => {
    const data = {
      userName,
      report,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await fetch('https://jackpot-backend.vercel.app/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setBannerSuccess(true);
        console.log('Datos enviados correctamente');
      } else {
        console.error('Error al enviar el reporte');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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

  return (
    <Fragment>
      <BannerSuccess
        banner={bannerSuccess}
        title="Reporte enviado correctamente"
      />

      <div
        className={`container-items-popup-detail-show ${
          active ? '' : 'container-items-popup-detail'
        }`}
      >
        <div className="card-popup-detail">
          <img
            className="img-close-popup-deatil"
            src={require('../images/close-white.png')}
            alt="close"
            onClick={closePopupDetail}
          />
          <div className="banner-color-popup-detail">
            <h1 className="title-banner-color-popup-detail">
              Reportes de actividades
            </h1>
          </div>

          <div className="card-inside-popup-jackpot-web">
            <div className="card-repor-info-comp">
              <div className="container-items-repor">
                <h1 className="text-items-repor">Nombre de usuario</h1>
                <input
                  className="input-item-repor-name"
                  placeholder="Ingrese el nombre"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <h1 className="text-items-repor">Ingrese el reporte</h1>
                <textarea
                  placeholder="Ingresa el motivo del reporte"
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                />
              </div>
            </div>

            <div className="row-jackpot-value span-btn-report-comp">
              <button
                className="btn-row-jackpot-actualization-value"
                onClick={handleSubmit}
              >
                Enviar Reporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardReportComp;
