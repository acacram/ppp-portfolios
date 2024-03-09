const express = require('express');
const router = express.Router();

// Importar controladores
const authControlador = require('../controllers/authControlador');
const registroControlador = require('../controllers/registroControlador');

/**
 * Definición de rutas para la autenticación y registro.
 *
 * @module routes/authRoutes
 * @type {Object}
 */

/**
 * Ruta GET para mostrar la página de registro.
 *
 * @name GET/signup
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get('/signup', (req, res) => {
  // Lógica para mostrar la página de registro
});

/**
 * Ruta GET para mostrar la página de inicio de sesión.
 *
 * @name GET/login
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get('/login', (req, res) => {
  // Lógica para mostrar la página de inicio de sesión
});

/**
 * Ruta GET para manejar el cierre de sesión.
 *
 * @name GET/logout
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get('/logout', (req, res) => {
  // Lógica para manejar el cierre de sesión
});

/**
 * Ruta POST para manejar el inicio de sesión.
 *
 * @name POST/login
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post('/login', authControlador.login);

/**
 * Ruta POST para manejar el registro de usuarios.
 *
 * @name POST/signup
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post('/signup', registroControlador.signup);

/**
 * Ruta GET para manejar el cierre de sesión.
 *
 * @name GET/logout
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get('/logout', authControlador.logout);

module.exports = router;
