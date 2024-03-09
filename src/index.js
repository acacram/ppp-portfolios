// index.js

import React from 'react';
import { createRoot } from 'react-dom/client'; // Change the import for createRoot
import './Styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/LoginForm';
import SignUp from './components/SignUpForm';
import UserDashboard from './components/UserDashboard';
import Create from './components/create';
import Edit from './components/edit';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

/**
 * Create a browser history instance.
 * @type {Object}
 */
const history = createBrowserHistory();

/**
 * Create a root for rendering React elements.
 * @type {Object}
 */
const root = createRoot(document.getElementById('root'));

/**
 * Set the scroller value for calculating the main content height.
 * @type {number}
 */
const scroller = 90;

/**
 * Styled component for the main content container.
 * @type {Object}
 */
const MainContent = styled.div`
  min-height: calc(100vh - ${scroller}px); /* Calculate the height of the main content */
  display: flex;
  flex-direction: column;
`;

// FRONT VIEWS
root.render(
  <Router history={history}>
    <React.StrictMode>
      <MainContent>
        <Routes className="w-100 h-100">
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </MainContent>
      <Footer />
    </React.StrictMode>
  </Router>
);

// Measure the performance of the React application.
reportWebVitals();
