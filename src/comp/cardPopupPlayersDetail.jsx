import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { NotificationContext } from '../services/NotificationContext';
import { RingLoader } from 'react-spinners';

function CardPopupPlayersDetail({
  active,
  closePopupDetail,
  showBannerSuccess,
}) {
  const { addNotification } = useContext(NotificationContext);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [step, setStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ nivel: '' });

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Fetch the existing players from the API
  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        'https://jackpot-backend.vercel.app/api/players',
      );
      setPlayers(response.data);
    } catch (error) {
      console.error('Error al obtener los jugadores:', error);
    }
  };

  // Handle click on a player to show their details
  const handlePlayerClick = (playerId) => {
    const clickedPlayer = players.find((player) => player.idPlayer === playerId);
    if (clickedPlayer) {
      setSelectedPlayer(clickedPlayer);
      setEditedData({ nivel: clickedPlayer.nivel });
      setStep(2);
    } else {
      console.error('No se encontró el jugador con ID:', playerId);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
    setSelectedPlayer(null);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Update the player's information
  const handleEditPlayer = async () => {
    if (!selectedPlayer) return;

    try {
      await axios.put(
        `https://jackpot-backend.vercel.app/api/players/${selectedPlayer.idPlayer}`,
        { ...selectedPlayer, nivel: editedData.nivel }
      );
      fetchPlayers();
      setIsEditing(false);
      showBannerSuccess();
    } catch (error) {
      console.error('Error al editar el jugador:', error);
    }
  };

  // Activate or deactivate the player
  const handleTogglePlayerStatus = async () => {
    if (!selectedPlayer) return;

    try {
      const newStatus = selectedPlayer.status === 'Active' ? 'Inactive' : 'Active';
      await axios.post(
        `https://jackpot-backend.vercel.app/api/${newStatus === 'Active' ? 'activate' : 'desactivate'}Player/${selectedPlayer.idPlayer}`
      );
      fetchPlayers();
      setStep(1);
      showBannerSuccess();
    } catch (error) {
      console.error('Error al cambiar el estado del jugador:', error);
    }
  };

  return (
    <Fragment>
      <div
        className={`container-items-popup-detail-show ${
          active ? '' : 'container-items-popup-detail'
        }`}
      >
        <div className="card-popup-detail">
          {step === 2 && (
            <img
              src={require('../images/back-white.png')}
              className="back-arrow"
              onClick={handlePreviousStep}
              alt="atras"
            />
          )}
          <img
            className="img-close-popup-deatil"
            src={require('../images/close-white.png')}
            alt="close"
            onClick={closePopupDetail}
          />
          <div className="banner-color-popup-detail">
            <h1 className="title-banner-color-popup-detail">
              Detalle de Jugadores
            </h1>
          </div>

          <div className="card-inside-popup-jackpot-web card-inside-popup-jackpot-web-span-amounts">
            {step === 1 && (
              <Fragment>
                {players.length > 0 ? (
                  players.map((player) => (
                    <motion.div
                      key={player.idPlayer}
                      className={`container-jackpot-selection-amount ${
                        player.status === 'Active' ? 'active' : ''
                      }`}
                      onClick={() => handlePlayerClick(player.idPlayer)}
                      whileHover={{ scale: 1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        className="img-jackpot-selection-amount"
                        src={require('../images/user.png')}
                        alt="player"
                      />
                      <h1 className="text-jackpot-selection-amount">
                        {player.username.toUpperCase()}
                      </h1>
                      <p className="amount-jackpot-selection-amount">
                        {`Nivel: ${player.nivel || 'Sin nivel'}`}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <RingLoader color={'orange'} size={30} />
                )}
              </Fragment>
            )}

            {step === 2 && selectedPlayer && (
              <Fragment>
                <div className="card-selected-actualization-jackpot">
                  <div className="card-selected-act-jack-text-espc">
                    {`ID del Jugador: ${selectedPlayer.idPlayer}`}
                  </div>
                  <h1 className="text-jackpot-selection-amount span-selected-comp">
                    {`Jugador: ${selectedPlayer.username}`}
                  </h1>
                  <p className="span-selected-comp">{`Nivel: ${selectedPlayer.nivel}`}</p>
                  <p className="span-selected-comp">{`Estado: ${selectedPlayer.status}`}</p>

                  {isEditing ? (
                    <Fragment>
                      <input
                        className="input-row-value-jackpot span-selected-comp"
                        type="text"
                        placeholder="Nuevo nivel"
                        name="nivel"
                        value={editedData.nivel}
                        onChange={handleChange}
                      />
                      <button
                        className="btn-row-jackpot-actualization-value span-selected-comp"
                        onClick={handleEditPlayer}
                      >
                        Guardar Cambios
                      </button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button
                        className="btn-row-jackpot-actualization-value span-selected-comp"
                        onClick={() => setIsEditing(true)}
                      >
                        Editar Información
                      </button>
                      <button
                        className="btn-row-jackpot-actualization-value span-selected-comp"
                        onClick={handleTogglePlayerStatus}
                      >
                        {selectedPlayer.status === 'Active' ? 'Desactivar' : 'Activar'} Jugador
                      </button>
                    </Fragment>
                  )}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardPopupPlayersDetail;
