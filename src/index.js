import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Aquí es donde van a estar todas las páginas, donde ocurre el redireccionamiento
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
      </Switch>
    </React.StrictMode>
  </Router>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
