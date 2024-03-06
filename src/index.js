// index.js

import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambia la importación de createRoot
import './Styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/LoginForm';
import SignUp from './components/SignUpForm';
import UserDashboard from './components/UserDashboard';
import Create from './components/create';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const history = createBrowserHistory();
const root = createRoot(document.getElementById('root')); // Utiliza createRoot

// VISTAS FRONT
root.render(
    <Router history={history}>
      <React.StrictMode>
        <Routes className="w-100 h-100">
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/create" element={<Create />} />
        </Routes>
        <Footer />

      </React.StrictMode>
    </Router> 
);

reportWebVitals();
