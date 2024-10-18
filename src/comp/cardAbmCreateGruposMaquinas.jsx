import React, { Fragment, useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import '../styles/cardAbmCreate.css';
import BannerSuccess from './bannerSuccess';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';

function CardAbmCreateGruposMaquinas({ onClosePopupAbm }) {
  const [formData, setFormData] = useState({
    idGrupoMaquina: '',
    maquinasAfiliadas: [],
  });
  const [bannerAbm, setBannerAbm] = useState(false);
  const { addNotification } = useContext(NotificationContext);
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const response = await axios.get('https://jackpot-backend.vercel.app/api/maquinas');
        setMaquinas(response.data);
      } catch (error) {
        console.error('Error fetching maquinas:', error);
      }
    };

    fetchMaquinas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedMaquina) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.maquinasAfiliadas.some(
        (maquina) => maquina.id === selectedMaquina.id,
      );
      const newMaquinasAfiliadas = isSelected
        ? prevFormData.maquinasAfiliadas.filter(
            (maquina) => maquina.id !== selectedMaquina.id,
          )
        : [...prevFormData.maquinasAfiliadas, selectedMaquina];

      return {
        ...prevFormData,
        maquinasAfiliadas: newMaquinasAfiliadas,
      };
    });
  };

  const handleSetBannerOpen = () => {
    setBannerAbm(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://jackpot-backend.vercel.app/api/grupos_maquinas',
        formData,
      );
      const notification = {
        text: `Se ha dado de alta un nuevo grupo de máquinas (${formData.idGrupoMaquina})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      if (response.status === 201) {
        handleSetBannerOpen();
        console.log(formData);
      }
    } catch (error) {
      console.error('Error creating grupo de máquinas:', error);
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      idGrupoMaquina: generateUniqueId(),
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
                Dar de alta nuevo Grupo de Máquinas
              </h1>
            </div>

            <div className="step-content">
              <div className="container span-container-abm-card-jackpots">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">ID Grupo Máquina</h1>
                      <input
                        className="input-abm-card"
                        type="text"
                        placeholder="Ingrese ID Grupo Máquina"
                        name="idGrupoMaquina"
                        value={formData.idGrupoMaquina}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">Afiliar Máquinas</h1>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {formData.maquinasAfiliadas.length > 0
                            ? formData.maquinasAfiliadas
                                .map((maquina) => maquina.idGMFriendly)
                                .join(', ')
                            : 'Listar Máquinas'}
                        </button>
                        <ul className="dropdown-menu">
                          {maquinas.map((maquina) => (
                            <li key={maquina.id}>
                              <button
                                className={`dropdown-item ${
                                  formData.maquinasAfiliadas.some(
                                    (selectedMaquina) =>
                                      selectedMaquina.id === maquina.id,
                                  )
                                    ? 'active'
                                    : ''
                                }`}
                                type="button"
                                onClick={() => handleSelectChange(maquina)}
                              >
                                {maquina.idGMFriendly}
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
          title="¡Grupo de máquinas creado correctamente!"
        />
      </motion.div>
    </Fragment>
  );
}

export default CardAbmCreateGruposMaquinas;
