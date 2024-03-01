import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambia la importación de createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const history = createBrowserHistory();
const root = createRoot(document.getElementById('root')); // Utiliza createRoot

root.render(
  <Router history={history}>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

reportWebVitals();
