import React, { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from './banner';
import '../styles/login.css';
import { useUser } from '../services/UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { updateUser, user } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.get('https://jackpot-backend.vercel.app/api/users');

      const users = response.data;
      const loggedInUser = users.find(
        (user) => user.name === username && user.idUser === password,
      );

      if (loggedInUser) {
        updateUser(loggedInUser);
        setLoginError('');
        navigate('/dashboard');
      } else {
        setLoginError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Fragment>
      <div className="login-container-dashboard">
        <motion.div
          transition={{
            duration: 0.3,
            delay: 0.3,
            ease: [0.5, 0.71, 1, 1.5],
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Banner title="Ingresa tus credenciales!" />

          <div className="container-welcome">
            <div className="item">
              <h1 className="title-welcome">
                Ingresa tus
                <br />
                <span className="item-span-welcome-screen">Credenciales!</span>
              </h1>
            </div>

            <div className="item span-input col-md-5">
              <input
                className="input-wel"
                placeholder="Ingrese usuario"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                className="input-wel"
                placeholder="Ingrese contraseña (ID)"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="item">
              <button
                className="btn-welcome span-login col-md-4"
                onClick={handleLogin}
              >
                Ingresar al dashboard
              </button>
            </div>
            {loginError && <Banner title={loginError} />}
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
}

export default Login;
