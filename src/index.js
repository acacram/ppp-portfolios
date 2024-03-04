import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambia la importación de createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import SignUp from './signUp';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const history = createBrowserHistory();
const root = createRoot(document.getElementById('root')); // Utiliza createRoot

root.render(
  <div>
  <Router history={history}>
    <React.StrictMode>
      <Routes className="w-100 h-100">
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </React.StrictMode>
  </Router></div>
);

reportWebVitals();
