const express = require('express');
const router = express.Router();

// Importar controladores
const users = require('../controllers/users');

/**
 * Definición de rutas para los usuarios.
 *
 * @module routes/usersRoutes
 * @type {Object}
 */

/**
 * Ruta GET para obtener todos los usuarios para la interfaz de usuario.
 *
 * @name GET/getItems
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get('/getItems', async (req, res) => {
  // Lógica para obtener todos los usuarios para la interfaz de usuario
});

/**
 * Ruta POST para obtener un usuario por su ID para la interfaz de usuario.
 *
 * @name POST/getItem/:_id
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post('/getItem/:_id', async (req, res) => {
  // Lógica para obtener un usuario por su ID para la interfaz de usuario
});

/**
 * Ruta PATCH para actualizar un usuario para la interfaz de usuario.
 *
 * @name PATCH/updateItem/:_id
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.patch('/updateItem/:_id', async (req, res) => {
  // Lógica para actualizar un usuario para la interfaz de usuario
});

/**
 * Ruta DELETE para eliminar un usuario para la interfaz de usuario.
 *
 * @name DELETE/deleteItem/:_id
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.delete('/deleteItem/:_id', async (req, res) => {
  // Lógica para eliminar un usuario para la interfaz de usuario
});

/**
 * Ruta GET para obtener todos los usuarios para el backend.
 *
 * @name GET/
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get('/', users.getItems);

/**
 * Ruta POST para crear un nuevo usuario para el backend.
 *
 * @name POST/createItem
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post('/createItem', users.createItem);

/**
 * Ruta GET para obtener la información de un usuario por su ID para el backend.
 *
 * @name GET/getUserInfo/:_id
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get('/getUserInfo/:_id', users.getUserInfo);

/**
 * Ruta PUT para actualizar un usuario para el backend.
 *
 * @name PUT/updateItem/:_id
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.put('/updateItem/:_id', users.updateItem);

/**
 * Ruta POST para eliminar un usuario para el backend.
 *
 * @name POST/deleteItem/:_id
 * @function
 * @memberof module:routes/usersRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post('/deleteItem/:_id', users.deleteItem);

module.exports = router;
