import React, { Fragment, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/cardAbmCreate.css';
import BannerSuccess from './bannerSuccess';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';

function CardAbmCreateUsers({ onClosePopupAbm }) {
  const [formData, setFormData] = useState({
    idUser: '',
    name: '',
    role: '',
    permissions: '',
  });
  const [bannerAbm, setBannerAbm] = useState(false);
  const { addNotification } = useContext(NotificationContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSetBannerOpen = () => {
    setBannerAbm(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://jackpot-backend.vercel.app/api/users',
        formData,
      );
      const notification = {
        text: `Se ha dado de alta un nuevo usuario (${formData.name})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      if (response.status === 201) {
        handleSetBannerOpen();
        console.log(formData);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      idUser: generateUniqueId(),
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
                Dar de alta nuevo Usuario
              </h1>
            </div>

            <div className="step-content">
              <div className="container span-container-abm-card-jackpots">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">ID Usuario</h1>
                      <input
                        className="input-abm-card"
                        type="text"
                        placeholder="Ingrese ID Usuario"
                        name="id"
                        value={formData.idUser}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">Role</h1>
                      <input
                        className="input-abm-card"
                        type="text"
                        placeholder="Ingrese Role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">Nombre</h1>
                      <input
                        className="input-abm-card"
                        type="text"
                        placeholder="Ingrese Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="card-items-row-abm">
                      <h1 className="text-row-card-abm">Permisos</h1>
                      <input
                        className="input-abm-card"
                        type="text"
                        placeholder="Ingrese Permisos"
                        name="permissions"
                        value={formData.permissions}
                        onChange={handleInputChange}
                      />
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
          title="¡Usuario creado correctamente!"
        />
      </motion.div>
    </Fragment>
  );
}

export default CardAbmCreateUsers;
