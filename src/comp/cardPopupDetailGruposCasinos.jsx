import React, { useContext, useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';
import BannerSuccess from './bannerSuccess';
import { motion } from 'framer-motion';
import '../styles/cardPopupDetail.css';
import Modal from 'react-modal';

const CardPopupDetailGruposCasino = ({
  grupoCasino,
  closePopupDetail,
  active,
  onDeactivate,
  onActivate,
  showBannerJackpotCreated,
  userPermissions,
}) => {
  const { addNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    idGrupoCasino: grupoCasino.idGrupoCasino,
    casinosAfiliados: grupoCasino.casinosAfiliados,
  });
  const [casinos, setCasinos] = useState([]);
  const [bannerAbm, setBannerAbm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

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

  const handleDeactivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/desactivateGruposCasino/${grupoCasino.idGrupoCasino}`,
      );
      onDeactivate(grupoCasino.idGrupoCasino);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha dado de baja un grupo de casino (${grupoCasino.idGrupoCasino})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al desactivar el grupo de casino:', error);
    }
  };

  const handleActivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/activateGruposCasino/${grupoCasino.idGrupoCasino}`,
      );
      onActivate(grupoCasino.idGrupoCasino);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha activado un grupo de casino (${grupoCasino.idGrupoCasino})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al activar el grupo de casino:', error);
    }
  };

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

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://jackpot-backend.vercel.app/api/modificarGruposCasino/${grupoCasino.idGrupoCasino}`,
        formData,
      );
      showBannerJackpotCreated();
      const notification = {
        text: `Grupo de casino (${formData.idGrupoCasino}) actualizado con éxito`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      setIsEditing(false);
      setBannerAbm(true);
    } catch (error) {
      console.error('Error updating grupo de casino:', error);
    }
  };

  const renderEditForm = () => (
    <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">ID Grupo Casino</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="idGrupoCasino"
          value={formData.idGrupoCasino}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Afiliar Casinos</h1>
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
                      (selectedCasino) => selectedCasino.id === casino.id,
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
      <button className="btn-submit-jackpot" onClick={handleSubmit}>
        Guardar Cambios
      </button>
      <button className="btn-cancel-edit" onClick={() => setIsEditing(false)}>
        Cancelar
      </button>
    </div>
  );

  const openModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmAction = () => {
    if (modalAction === 'submit') {
      handleSubmit();
    } else if (modalAction === 'deactivate') {
      handleDeactivate();
    } else if (modalAction === 'activate') {
      handleActivate();
    }
    closeModal();
  };

  return (
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
            {isEditing
              ? 'Modificar Grupo de Casino'
              : 'Detalle del grupo de casino'}
          </h1>
        </div>
        {isEditing ? (
          renderEditForm()
        ) : (
          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Grupo Casino</h1>
              <p className="text-row-mobile-jackpot">
                {grupoCasino.idGrupoCasino}
              </p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Estado</h1>
              <p className="text-row-mobile-jackpot">{grupoCasino.status}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Casinos Afiliados</h1>
              <p className="text-row-mobile-jackpot">
                {grupoCasino.casinosAfiliados
                  .map((casino) => casino.idCasino)
                  .join(', ')}
              </p>
            </div>
            <button
              className="btn-edit-jackpot"
              onClick={() => setIsEditing(true)}
            >
              Modificar
            </button>
            {grupoCasino.status === 'Inactive' ? (
              <button
                className="btn-activate-jackpot"
                onClick={() => openModal('activate')}
              >
                Dar de alta
              </button>
            ) : (
              <button
                className="btn-deactivate-jackpot"
                onClick={() => openModal('deactivate')}
              >
                Dar de baja
              </button>
            )}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Action"
      >
        <h2>Confirmar Acción</h2>
        <p>
          ¿Estás seguro de que deseas{' '}
          {modalAction === 'submit'
            ? 'guardar los cambios'
            : modalAction === 'deactivate'
            ? 'dar de baja'
            : 'dar de alta'}{' '}
          este jackpot?
        </p>
        <button className="btn-confirm-overlay" onClick={confirmAction}>
          Confirmar
        </button>
        <button className="btn-cancel-overlay" onClick={closeModal}>
          Cancelar
        </button>
      </Modal>
    </div>
  );
};

export default CardPopupDetailGruposCasino;
