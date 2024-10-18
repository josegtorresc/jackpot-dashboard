import React, { useContext, useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { NotificationContext } from '../services/NotificationContext';
import BannerSuccess from './bannerSuccess';
import { motion } from 'framer-motion';
import '../styles/cardPopupDetailMaquinas.css';
import Modal from 'react-modal';

const CardPopupDetailGruposMaquinas = ({
  grupoMaquinas,
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
    idGrupoMaquina: grupoMaquinas.idGrupoMaquina,
    maquinasAfiliadas: grupoMaquinas.maquinasAfiliadas,
  });
  const [maquinas, setMaquinas] = useState([]);
  const [bannerAbm, setBannerAbm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

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

  const handleDeactivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/desactivate_grupos_maquinas/${grupoMaquinas.idGrupoMaquina}`,
      );
      onDeactivate(grupoMaquinas.idGrupoMaquina);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha dado de baja un grupo de máquinas (${grupoMaquinas.idGrupoMaquina})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al desactivar el grupo de máquinas:', error);
    }
  };

  const handleActivate = async () => {
    try {
      await axios.post(
        `https://jackpot-backend.vercel.app/api/activate_grupos_maquinas/${grupoMaquinas.idGrupoMaquina}`,
      );
      onActivate(grupoMaquinas.idGrupoMaquina);
      showBannerJackpotCreated();
      const notification = {
        text: `Se ha activado un grupo de máquinas (${grupoMaquinas.idGrupoMaquina})`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
    } catch (error) {
      console.error('Error al activar el grupo de máquinas:', error);
    }
  };

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

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://jackpot-backend.vercel.app/api/grupos_maquinas/${grupoMaquinas.idGrupoMaquina}`,
        formData,
      );
      showBannerJackpotCreated();
      const notification = {
        text: `Grupo de máquinas (${formData.idGrupoMaquina}) actualizado con éxito`,
        date: new Date().toLocaleString(),
        img: require('../images/conf.png'),
      };
      addNotification(notification);
      setIsEditing(false);
      setBannerAbm(true);
    } catch (error) {
      console.error('Error al actualizar grupo de máquinas:', error);
    }
  };

  const renderEditForm = () => (
    <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">ID Grupo Máquinas</h1>
        <input
          className="input-row-mobile-jackpot"
          type="text"
          name="idGrupoMaquina"
          value={formData.idGrupoMaquina}
          onChange={handleInputChange}
        />
      </div>
      <div className="row-popup-mobile-jackpot">
        <h1 className="title-row-mobile-jackpot">Afiliar Máquinas</h1>
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
                      (selectedMaquina) => selectedMaquina.id === maquina.id,
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
              ? 'Modificar Grupo de Máquinas'
              : 'Detalle del grupo de máquinas'}
          </h1>
        </div>
        {isEditing ? (
          renderEditForm()
        ) : (
          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">ID Grupo Máquinas</h1>
              <p className="text-row-mobile-jackpot">
                {grupoMaquinas.idGrupoMaquina}
              </p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Estado</h1>
              <p className="text-row-mobile-jackpot">{grupoMaquinas.status}</p>
            </div>
            <div className="row-popup-mobile-jackpot">
              <h1 className="title-row-mobile-jackpot">Máquinas Afiliadas</h1>
              <p className="text-row-mobile-jackpot">
                {grupoMaquinas.maquinasAfiliadas
                  .map((maquina) => maquina.idGMFriendly)
                  .join(', ')}
              </p>
            </div>
            <button
              className="btn-edit-jackpot"
              onClick={() => setIsEditing(true)}
            >
              Modificar
            </button>
            {grupoMaquinas.status === 'false' ? (
              <button
                className="btn-activate-jackpot"
                onClick={() => openModal('activate')}
              >
                Activar
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
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Confirmación</h2>
        <p>
          ¿Estás seguro de que deseas{' '}
          {modalAction === 'submit'
            ? 'guardar los cambios'
            : modalAction === 'deactivate'
            ? 'dar de baja'
            : 'activar'}
          ?
        </p>
        <button onClick={confirmAction}>Confirmar</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
      {bannerAbm && (
        <BannerSuccess message="Grupo de máquinas actualizado con éxito" />
      )}
    </div>
  );
};

export default CardPopupDetailGruposMaquinas;
