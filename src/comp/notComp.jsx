import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import '../styles/notComp.css';
import CardNot from './cardNot';
import EmptyNot from './emptyNot';
import ModalNotComp from './modalNotComp';
import { NotificationContext } from '../services/NotificationContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useUser } from '../services/UserContext';

function NotComp() {
  const { notifications } = useContext(NotificationContext);
  const { user } = useUser();
  const [activeNot, setActiveNot] = useState(false);
  const [activeNotRepor, setActiveNotRepor] = useState(false);
  const [reports, setReports] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const notContainerRef = useRef(null);
  const [popupDetail, setPopupDetail] = useState(false);
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://jackpot-backend.vercel.app/reports');
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else {
          console.error('Error fetching reports');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReports();
  }, []);

  const handleCloseAside = () => {
    setActiveNot(false);
  };

  const handleCloseAsideRepor = () => {
    setActiveNotRepor(false);
  };

  const handleOpenModal = (content) => {
    setPopupDetail(true);
    setModalContent({ ...content, user });
    setStep(1); // Reset step to 1 when opening the modal
  };

  const handleCloseModal = () => {
    setPopupDetail(false);
    setModalContent(null);
    setStep(1); // Reset step to 1 when closing the modal
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Detalle de Notificación', 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);

    const tableColumn = ['Campo', 'Detalle'];
    const tableRows = [];

    tableRows.push(['Asunto:', modalContent.text]);
    tableRows.push(['Fecha:', modalContent.date]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`notification_${modalContent.id}.pdf`);
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.date.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedNotifications = filteredNotifications
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    })
    .reverse();

  return (
    <Fragment>
      <div
        className={`container-not-aside-general-info ${
          activeNot ? 'container-not-aside-general-info-show' : ''
        }`}
        ref={notContainerRef}
      >
        <img
          className="img-section-aside-not"
          src={require('../images/close.png')}
          onClick={handleCloseAside}
          alt="close"
        />

        <div className="container-aside-inside">
          <h1 className="title-aside-inside">Notificaciones</h1>

          {sortedNotifications.length === 0 ? (
            <EmptyNot />
          ) : (
            <>
              <input
                type="text"
                placeholder="Buscar notificaciones especificas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-not-comp"
              />
              {sortedNotifications.map((notification, index) => (
                <CardNot
                  key={index}
                  title={notification.text}
                  text={notification.date}
                  img={notification.img}
                  onClick={() => handleOpenModal(notification)}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div
        className={`container-not-aside-general-info ${
          activeNotRepor ? 'container-not-aside-general-info-show' : ''
        }`}
        ref={notContainerRef}
      >
        <img
          className="img-section-aside-not"
          src={require('../images/close.png')}
          onClick={handleCloseAsideRepor}
          alt="close"
        />

        <div className="container-aside-inside">
          <h1 className="title-aside-inside">Reportes</h1>

          {reports.length === 0 ? (
            <EmptyNot />
          ) : (
            reports.map((report, index) => (
              <CardNot
                key={index}
                title={`(Usuario): ${report.userName}`}
                text={report.report}
                img={require('../images/conf.png')}
                onClick={() => handleOpenModal(report)}
              />
            ))
          )}
        </div>
      </div>

      <div className="container-section-nav-items">
        <div className="container-img--items">
          <img
            className="img--items"
            src={require('../images/campana.png')}
            onClick={() => setActiveNot(!activeNot)}
            alt="Notificaciones"
          />
          <span className="item-img-span"></span>
        </div>
        <div className="container-img--items">
          <img
            className="img--items"
            src={require('../images/not.png')}
            onClick={() => setActiveNotRepor(!activeNotRepor)}
            alt="Reportes"
          />
          <span className="item-img-span"></span>
        </div>
      </div>

      {popupDetail && (
        <ModalNotComp onClose={handleCloseModal}>
          {step === 1 ? (
            <div className="container-row-items-modal">
              <img
                className="modal-des-button-img-not-comp"
                src={require('../images/des-not.png')}
                alt="descargar pdf de notCompItem"
                onClick={generatePDF}
              />
              <div className="container-row-item-modal-not-comp-comp">
                {modalContent.img && (
                  <img
                    className="img-modal-not-comp"
                    src={modalContent.img}
                    alt="Notification"
                  />
                )}
              </div>
              <div className="container-row-item-modal-not-comp-comp">
                <h1 className="title-modal-not-comp">Asunto:</h1>
                <h2 className="title-modal-not-comp-comp">
                  {modalContent.text}
                </h2>
                <h1 className="title-modal-not-comp">Fecha:</h1>
                <p className="text-modal-not-comp-comp">{modalContent.date}</p>
                <button
                  className="btn-view-more-details"
                  onClick={() => setStep(2)}
                >
                  Ver más detalles
                </button>
              </div>
            </div>
          ) : (
            <div className="container-row-items-modal">
              {modalContent.user && (
                <Fragment>
                  <div className="container-row-item-modal-not-comp-comp">
                    {modalContent.img && (
                      <img
                        className="img-modal-not-comp"
                        src={require('../images/user.png')}
                        alt="Notification"
                      />
                    )}
                  </div>
                  <div className="container-row-item-modal-not-comp-comp">
                    <h1 className="title-modal-not-comp">Usuario:</h1>
                    <p className="text-modal-not-comp-comp">
                      {modalContent.user.name}
                    </p>
                  </div>

                  <div className="container-row-item-modal-not-comp-comp">
                    <h1 className="title-modal-not-comp">Permisos:</h1>
                    <p className="text-modal-not-comp-comp">
                      {modalContent.user.permissions}
                    </p>
                  </div>

                  <div className="container-row-item-modal-not-comp-comp">
                    <h1 className="title-modal-not-comp">Rol:</h1>
                    <p className="text-modal-not-comp-comp">
                      {modalContent.user.role}
                    </p>
                  </div>
                </Fragment>
              )}
            </div>
          )}
        </ModalNotComp>
      )}
    </Fragment>
  );
}

export default NotComp;
