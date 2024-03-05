const express = require('express');
const router = express.Router();

// controladores
const authControlador = require('../controllers/authControlador');
const registroControlador = require('../controllers/registroControlador');

// rutas get
router.get('/signup', (req, res) => {
});
router.get('/login', (req, res) => {
    
});
router.get('/logout', (req, res) => {
    
});
// rutas post
router.post('/login', authControlador.login);
router.post('/signup', registroControlador.signup);
router.get('/logout', authControlador.logout);

module.exports = router;