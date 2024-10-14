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
import { RingLoader } from 'react-spinners';

function CardAbmCreate({ onClosePopupAbm, showBannerJackpotCreated }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    trigger: '',
    monto: '',
    idAutomatico: '',
    idCasino: '',
    idMaquina: '',
  });
  const [bannerAbm, setBannerAbm] = useState(false);
  const fileInputRef = useRef(null);
  const { addNotification } = useContext(NotificationContext);
  const [maquinas, setMaquinas] = useState([]);
  const [casinos, setCasinos] = useState([]);
  const [gruposCasino, setGruposCasino] = useState([]);
  const [gruposMaquinas, setGruposMaquinas] = useState([]);
  const [loadingMaquinas, setLoadingMaquinas] = useState(true);
  const [loadingCasinos, setLoadingCasinos] = useState(true);
  const [loadingGruposCasinos, setLoadingGruposCasinos] = useState(true);
  const [loadingGruposMaquinas, setLoadingGruposMaquinas] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const response = await axios.get('https://jackpot-backend.vercel.app/api/maquinas');
        setMaquinas(response.data);
        setLoadingMaquinas(false);
      } catch (error) {
        console.error('Error fetching maquinas:', error);
      }
    };

    fetchMaquinas();
  }, []);

  useEffect(() => {
    const fetchCasinos = async () => {
      try {
        const response = await axios.get('https://jackpot-backend.vercel.app/api/casinos');
        setCasinos(response.data);
        setLoadingCasinos(false);
      } catch (error) {
        console.error('Error fetching casinos:', error);
      }
    };

    fetchCasinos();
  }, []);

  useEffect(() => {
    const fetchGruposCasinos = async () => {
      try {
        const response = await axios.get(
          'https://jackpot-backend.vercel.app/api/grupos_casino',
        );
        setGruposCasino(response.data);
        setLoadingGruposCasinos(false);
      } catch (error) {
        console.error('Error fetching casinos:', error);
      }
    };

    fetchGruposCasinos();
  }, []);

  useEffect(() => {
    const fetchGruposMaquinas = async () => {
      try {
        const response = await axios.get(
          'https://jackpot-backend.vercel.app/api/grupos_maquinas',
        );
        setGruposMaquinas(response.data);
        setLoadingGruposMaquinas(false);
      } catch (error) {
        console.error('Error fetching casinos:', error);
      }
    };

    fetchGruposMaquinas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.nombre) {
        newErrors.nombre = 'El nombre es obligatorio';
      }
      if (!formData.trigger) {
        newErrors.trigger = 'El trigger es obligatorio';
      }
      if (!formData.monto) {
        newErrors.monto = 'El monto inicial es obligatorio';
      }
    }
    
    if (step === 2) {
      if (!formData.idCasino) {
        newErrors.idCasino = 'Debes seleccionar un casino';
      }
      if (!formData.idMaquina) {
        newErrors.idMaquina = 'Debes seleccionar una máquina';
      }
    }
  
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };


  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
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

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://jackpot-backend.vercel.app/api/jackpots',
        formData,
      );
      const notification = {
        text: `Se ha creado un nuevo jackpot (${formData.nombre})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      showBannerJackpotCreated();
      if (response.status === 201) {
        handleSetBannerOpen();
        console.log(formData);
      }
    } catch (error) {
      console.error('Error creating jackpot:', error);
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      idAutomatico: generateUniqueId(),
    }));
  }, []);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content" key="step1">
            <div className="container span-container-abm-card-jackpots">
              <div className="row">
                <div className="col-md-6">
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">Ingrese Nombre</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese Nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">Ingrese Trigger</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese Trigger"
                      name="trigger"
                      value={formData.trigger}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">Ingrese Monto Inicial</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="Ingrese Monto"
                      name="monto"
                      value={formData.monto}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">ID Automático</h1>
                    <input
                      className="input-abm-card"
                      type="text"
                      placeholder="ID Automático"
                      name="idAutomatico"
                      value={formData.idAutomatico}
                      onChange={handleInputChange}
                      required
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
                    <h1 className="text-row-card-abm">Ingrese ID Casino</h1>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {formData.idCasino
                          ? formData.idCasino
                          : 'Listar Casinos'}
                      </button>
                      <ul className="dropdown-menu">
                        {loadingCasinos ? (
                          <div className="center-loader-abm">
                            <RingLoader color={'orange'} size={30} />
                          </div>
                        ) : casinos.length === 0 ? (
                          <li>No hay casinos disponibles</li>
                        ) : (
                          casinos.map((casino) => (
                            <li key={casino.id}>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    idCasino: casino.idCasino,
                                  })
                                }
                              >
                                {casino.idCasino}
                              </button>
                            </li>
                          ))
                        )}

                        {loadingGruposCasinos ? (
                          <div className="center-loader-abm">
                            <RingLoader color={'orange'} size={30} />
                          </div>
                        ) : gruposCasino.length === 0 ? (
                          <li>No hay grupos de casino disponibles</li>
                        ) : (
                          gruposCasino.map((casino) => (
                            <li key={casino.id}>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    idCasino: casino.idGrupoCasino,
                                  })
                                }
                              >
                                {casino.idGrupoCasino}
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card-items-row-abm">
                    <h1 className="text-row-card-abm">Ingrese ID máquina</h1>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {formData.idMaquina
                          ? formData.idMaquina
                          : 'Listar máquinas'}
                      </button>
                      <ul className="dropdown-menu">
                        {loadingMaquinas ? (
                          <div className="center-loader-abm">
                            <RingLoader color={'orange'} size={30} />
                          </div>
                        ) : maquinas.length === 0 ? (
                          <li className="dropdown-item">
                            No hay máquinas disponibles
                          </li>
                        ) : (
                          <>
                            <strong>Máquinas</strong>
                            {maquinas.map((maquina) => (
                              <li key={maquina.id}>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      idMaquina: maquina.idGMFriendly,
                                    })
                                  }
                                >
                                  {maquina.idGMFriendly}
                                </button>
                              </li>
                            ))}
                          </>
                        )}
                        {loadingGruposMaquinas ? (
                          <div className="center-loader-abm">
                            <RingLoader color={'orange'} size={30} />
                          </div>
                        ) : gruposMaquinas.length === 0 ? (
                          <li className="dropdown-item">
                            No hay grupos de máquinas disponibles
                          </li>
                        ) : (
                          <>
                            <strong>Grupos Máquinas</strong>
                            {gruposMaquinas.map((maquina) => (
                              <li key={maquina.id}>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      idMaquina: maquina.idGrupoMaquina,
                                    })
                                  }
                                >
                                  {maquina.idGrupoMaquina}
                                </button>
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </div>
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
              <p>Nombre: {formData.nombre}</p>
              <p>Trigger: {formData.trigger}</p>
              <p>Monto: {formData.monto}</p>
              <p>ID Automático: {formData.idAutomatico}</p>
              <p>ID Casino: {formData.idCasino}</p>
              <p>ID Máquina: {formData.idMaquina}</p>
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
                {step === 1 && 'Crear nuevo Jackpot'}
                {step === 2 && 'Asignación de Casinos y Máquinas'}
                {step === 3 && 'Confirmación del Jackpot'}
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
      </motion.div>
    </Fragment>
  );
}

export default CardAbmCreate;
