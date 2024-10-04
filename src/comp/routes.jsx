import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from '../services/NotificationContext';
import Login from './login.jsx';
import Dashboard from '../pages/dashboard.jsx';
import JackpotsComp from './jackpotsComp.jsx';
import PlayersComp from './playersComp.jsx';
import EstComp from './estComp.jsx';
import ConfigComp from './configComp.jsx';
import AbmComp from './abmComp.jsx';
import TransactionDetail from '../compsMobiles/transactionDetail';
import AbmUsuarios from './abmUsuarios.jsx';
import AbmMaquinas from './abmMaquinas.jsx';
import AbmCasinos from './abmCasinos.jsx';
import AbmGruposCasinos from './abmGruposCasinos.jsx';
import AbmGruposMaquinas from './abmGruposMaquinas.jsx';
import { UserProvider } from '../services/UserContext';

function RoutesApp() {
  return (
    <NotificationProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="jackpots" element={<JackpotsComp />} />
              <Route path="players" element={<PlayersComp />} />
              <Route path="estadisticas" element={<EstComp />} />
              <Route path="configuracion" element={<ConfigComp />} />
              <Route path="abm/jackpots" element={<AbmComp />} />
              <Route path="abm/usuarios" element={<AbmUsuarios />} />
              <Route path="abm/maquinas" element={<AbmMaquinas />} />
              <Route path="abm/casinos" element={<AbmCasinos />} />
              <Route path="abm/grupos-casinos" element={<AbmGruposCasinos />} />
              <Route
                path="abm/grupos-maquinas"
                element={<AbmGruposMaquinas />}
              />
            </Route>
            <Route
              path="/transaction/:transactionId"
              element={<TransactionDetail />}
            />
          </Routes>
        </Router>
      </UserProvider>
    </NotificationProvider>
  );
}

export default RoutesApp;
