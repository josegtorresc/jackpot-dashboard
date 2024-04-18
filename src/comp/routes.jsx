import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login.jsx';
import Dashboard from '../pages/dashboard.jsx';
import JackpotsComp from './jackpotsComp.jsx'; // Importa JackpotsComp

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="jackpots" element={<JackpotsComp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesApp;
