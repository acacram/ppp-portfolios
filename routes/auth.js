// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
// Rutas
app.use('/auth', authRoutes); // Monta las rutas de autenticación en '/auth'

module.exports = router;
