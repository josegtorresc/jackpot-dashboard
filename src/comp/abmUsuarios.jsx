import React, { Fragment, useEffect, useState } from 'react';
import BannerDash from './bannerDash';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import DropComp from './dropComp';
import NotComp from './notComp';
import CardAbmJackpots from './cardAbmJackpots';
import axios from 'axios';
import '../styles/estComp.css';
import '../styles/abmUsuarios.css';
import CardPopupDetailUsuario from './cardPopupDetailUsuarios';
import CardAbmCreateUsers from './cardAbmCreateUsers';
import LoadingDetailTrans from '../compsMobiles/loaderDetailTrans';
import FlashMessageStatic from './flashMessageStatic';
import BannerSuccess from './bannerSuccess';

function AbmUsuarios({ formattedDate, selectedComponent }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: 1500,
  };

  const [loadingDetailTransactions, setLoadingDetailTransactions] =
    useState(false);
  const [popupDetail, setPopupDetail] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [bannerAbm, setBannerAbm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jackpot-backend.vercel.app/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const showPopupDetail = (user) => {
    setSelectedUser(user);
    setPopupDetail(true);
  };

  const closePopupDetailEst = () => {
    setPopupDetail(false);
    setSelectedUser(null);
  };

  const handleDeactivateUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.idUser === userId ? { ...user, status: 'Inactive' } : user,
      ),
    );
    closePopupDetailEst();
  };

  const handleActivateUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.idUser === userId ? { ...user, status: 'Active' } : user,
      ),
    );
    closePopupDetailEst();
  };

  const handleCloseCreateJackpot = () => {
    setLoadingDetailTransactions(false);
    setShowCreateUser(false);
  };

  const handleCreateUserClick = () => {
    setLoadingDetailTransactions(true);
    setShowCreateUser(true);
  };

  const showBannerJackpotCreated = () => {
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

  return (
    <Fragment>
      {loadingDetailTransactions && <LoadingDetailTrans />}
      <div className="container-title-top-dash-general">
        <h1 className="title-top-dash-general">
          Dashboard -{' '}
          <span className="span-title-dash-view-mobile">(ABM) Usuarios</span>
        </h1>
        <DropComp selectedComponent={selectedComponent} />
        <h1 className="title-top-dash-hour">14:23:00 PM</h1>
        <NotComp />
      </div>

      <Slider {...settings}>
        <div>
          <BannerDash
            title="Administra los Usuarios"
            formattedDate={formattedDate}
          />
        </div>
        <div>
          <BannerDash
            title="Todo con clicks sencillos"
            formattedDate={formattedDate}
          />
        </div>
      </Slider>
      <div className="container container-dash-items-row">
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/permisos.png')}
              title="Permisos"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/roles.png')}
              title="Roles"
            />
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <CardAbmJackpots
              img={require('../images/crear.png')}
              title="Dar de alta Usuario"
              onClick={handleCreateUserClick}
            />
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card-items-row-transactions">
              <div className="table-container">
                {users.length > 0 ? (
                  <>
                    <div className="table-header">
                      <div className="item-section-row-header">
                        <strong>ID Usuario</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Nombre</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Estado</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Rol</strong>
                      </div>
                      <div className="item-section-row-header">
                        <strong>Permisos</strong>
                      </div>
                    </div>
                    {users.map((users, index) => (
                      <div
                        key={index}
                        className="item-section-row-complete"
                        onClick={() => showPopupDetail(users)}
                      >
                        <div className="item-section-row-data">
                          <p>{users.idUser}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{users.name}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{users.status}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{users.role}</p>
                        </div>
                        <div className="item-section-row-data">
                          <p>{users.permissions}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <FlashMessageStatic />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <CardPopupDetailUsuario
          usuario={selectedUser}
          closePopupDetail={closePopupDetailEst}
          active={popupDetail}
          onDeactivate={handleDeactivateUser}
          onActivate={handleActivateUser}
          showBannerJackpotCreated={showBannerJackpotCreated}
        />
      )}

      {showCreateUser && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardAbmCreateUsers onClosePopupAbm={handleCloseCreateJackpot} />
        </motion.div>
      )}

      <BannerSuccess banner={bannerAbm} title="Usuario modificado" />
    </Fragment>
  );
}

export default AbmUsuarios;
