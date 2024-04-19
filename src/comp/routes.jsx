import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login.jsx';
import Dashboard from '../pages/dashboard.jsx';
import JackpotsComp from './jackpotsComp.jsx'; // Importa JackpotsComp
import PlayersComp from './playersComp.jsx';
import EstComp from './estComp.jsx';
import ConfigComp from './configComp.jsx';

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/jackpots" element={<JackpotsComp />} />
          <Route path="/dashboard/players" element={<PlayersComp />} />
          <Route path="/dashboard/estadisticas" element={<EstComp />} />
          <Route path="/dashboard/configuracion" element={<ConfigComp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesApp;
