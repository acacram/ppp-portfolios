// index.js

import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambia la importación de createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/LoginForm';
import SignUp from './components/SignUpForm';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Autenticado'; // para saber el estado logeado

const history = createBrowserHistory();
const root = createRoot(document.getElementById('root')); // Utiliza createRoot

// VISTAS
root.render(
  <AuthProvider>
    <Router history={history}>
      <React.StrictMode>
        <Routes className="w-100 h-100">
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </React.StrictMode>
    </Router>
  </AuthProvider> 
);

reportWebVitals();
