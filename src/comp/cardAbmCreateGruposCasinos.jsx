import React, { Fragment, useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import '../styles/cardAbmCreate.css';
import BannerSuccess from './bannerSuccess';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';

function CardAbmCreateGruposCasinos({ onClosePopupAbm }) {
  const [formData, setFormData] = useState({
    idGrupoCasino: '',
    casinosAfiliados: [],
  });
  const [bannerAbm, setBannerAbm] = useState(false);
  const { addNotification } = useContext(NotificationContext);
  const [casinos, setCasinos] = useState([]);

  useEffect(() => {
    const fetchCasinos = async () => {
      try {
        const response = await axios.get('https://jackpot-backend.vercel.app/api/casinos');
        setCasinos(response.data);
      } catch (error) {
        console.error('Error fetching casinos:', error);
      }
    };

    fetchCasinos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedCasino) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.casinosAfiliados.some(
        (casino) => casino.id === selectedCasino.id,
      );
      const newCasinosAfiliados = isSelected
        ? prevFormData.casinosAfiliados.filter(
            (casino) => casino.id !== selectedCasino.id,
          )
        : [...prevFormData.casinosAfiliados, selectedCasino];

      return {
        ...prevFormData,
        casinosAfiliados: newCasinosAfiliados,
      };
    });
  };

  const handleSetBannerOpen = () => {
    setBannerAbm(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://jackpot-backend.vercel.app/api/grupos_casino',
        formData,
      );
      const notification = {
        text: `Se ha dado de alta un nuevo grupo de casino (${formData.idGrupoCasino})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      if (response.status === 201) {
        handleSetBannerOpen();
        console.log(formData);
      }
    } catch (error) {
      console.error('Error creating grupo de casino:', error);
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      idGrupoCasino: generateUniqueId(),
    }));
  }, []);

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
              <h1 className="text-banner-mark-card-abm-create-jackpots">
                Dar de alta nuevo Grupo de Casino
              </h1>
            </div>

            <div className="step-content">
              <div className="container span-container-abm-card-jackpots">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">ID Grupo Casino</h1>
                      <input
                        className="input-abm-card"
                        type="text"
                        placeholder="Ingrese ID Grupo Casino"
                        name="idGrupoCasino"
                        value={formData.idGrupoCasino}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">Afiliar Casinos</h1>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {formData.casinosAfiliados.length > 0
                            ? formData.casinosAfiliados
                                .map((casino) => casino.idCasino)
                                .join(', ')
                            : 'Listar Casinos'}
                        </button>
                        <ul className="dropdown-menu">
                          {casinos.map((casino) => (
                            <li key={casino.id}>
                              <button
                                className={`dropdown-item ${
                                  formData.casinosAfiliados.some(
                                    (selectedCasino) =>
                                      selectedCasino.id === casino.id,
                                  )
                                    ? 'active'
                                    : ''
                                }`}
                                type="button"
                                onClick={() => handleSelectChange(casino)}
                              >
                                {casino.idCasino}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="button-container">
              <button className="btn-abm-card-jackpots" onClick={handleSubmit}>
                Confirmar
              </button>
            </div>
          </div>
        </div>

        <BannerSuccess
          banner={bannerAbm}
          title="¡Grupo de casino creado correctamente!"
        />
      </motion.div>
    </Fragment>
  );
}

export default CardAbmCreateGruposCasinos;
