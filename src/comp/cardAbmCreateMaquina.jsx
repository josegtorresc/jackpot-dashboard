import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/cardAbmCreate.css';
import BannerSuccess from './bannerSuccess';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';

function CardAbmCreateMaquina({ onClosePopupAbm }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    idGM: '',
    idGMFriendly: '',
    idCasino: '',
    idArea: '',
    fecha: '',
    idGMMAnufacturer: '',
    baseAccounting: '',
    gmSerialNumber: '',
  });
  const [bannerAbm, setBannerAbm] = useState(false);
  const fileInputRef = useRef(null);
  const { addNotification } = useContext(NotificationContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSetBannerOpen = () => {
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    const updatedFormData = { ...formData, fecha: getCurrentDate() };
    try {
      const response = await axios.post(
        'https://jackpot-backend.vercel.app/api/maquinas',
        updatedFormData,
      );
      const notification = {
        text: `Se ha creado una nueva máquina (${formData.idGMFriendly})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      if (response.status === 201) {
        handleSetBannerOpen();
      }
    } catch (error) {
      console.error('Error creating machine:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content" key="step1">
            <div className="container span-container-abm-card-jackpots">
              <div className="row">
                <div className="col-md-6">
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">Ingrese IDGM</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese IDGM"
                      name="idGM"
                      value={formData.idGM}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">Ingrese IDGMFriendly</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese IDGMFriendly"
                      name="idGMFriendly"
                      value={formData.idGMFriendly}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">Ingrese ID Casino</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese ID Casino"
                      name="idCasino"
                      value={formData.idCasino}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">ID Area</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese ID Area"
                      name="idArea"
                      value={formData.idArea}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content" key="step2">
            <div className="container span-container-abm-card-jackpots">
              <div className="row">
                <div className="col-md-6">
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">Ingrese Fecha</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese Fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">
                      Ingrese IDGMMAnufacturer
                    </h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese IDGMMAnufacturer"
                      name="idGMMAnufacturer"
                      value={formData.idGMMAnufacturer}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">
                      Ingrese BaseAccounting
                    </h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese BaseAccounting"
                      name="baseAccounting"
                      value={formData.baseAccounting}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">
                      Ingrese GMSerialNumber
                    </h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese GMSerialNumber"
                      name="gmSerialNumber"
                      value={formData.gmSerialNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content" key="step3">
            <div className="container span-container-abm-card-jackpots">
              <h1 className="text-row-card-abm">Resumen</h1>
              <p>IDGM: {formData.idGM}</p>
              <p>IDGMFriendly: {formData.idGMFriendly}</p>
              <p>ID Casino: {formData.idCasino}</p>
              <p>ID Area: {formData.idArea}</p>
              <p>Fecha: {formData.fecha}</p>
              <p>IDGMMAnufacturer: {formData.idGMMAnufacturer}</p>
              <p>BaseAccounting: {formData.baseAccounting}</p>
              <p>GMSerialNumber: {formData.gmSerialNumber}</p>
              <button onClick={handleSubmit} className="btn-abm-card-jackpots">
                Confirmar
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="container-extern-abm-create-jackpots">
          <div className="card-abm-create-jackpots">
            <div className="banner-mark-card-abm-create-jackpots">
              <img
                className="close-popup-abm-jackpots"
                src={require('../images/close-white.png')}
                alt="popup"
                onClick={onClosePopupAbm}
              />
              {step > 1 && (
                <img
                  src={require('../images/back-white.png')}
                  className="back-arrow"
                  onClick={handlePreviousStep}
                  alt="atras"
                />
              )}
              <h1 className="text-banner-mark-card-abm-create-jackpots">
                {step === 1 && 'Dar de alta nueva Máquina'}
                {step === 2 && 'Detalles adicionales'}
                {step === 3 && 'Confirmación de la Máquina'}
              </h1>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            <div className="button-container">
              {step < 3 && (
                <button
                  className="btn-abm-card-jackpots"
                  onClick={handleNextStep}
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>
        </div>

        <BannerSuccess
          banner={bannerAbm}
          title="Maquina creada correctamente!!"
        />
      </motion.div>
    </Fragment>
  );
}

export default CardAbmCreateMaquina;
