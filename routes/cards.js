const express = require("express");
const router = express.Router();

// Importar controladores
const cards = require("../controllers/cards");

/**
 * Definición de rutas para las tarjetas (cards).
 *
 * @module routes/cardsRoutes
 * @type {Object}
 */

/**
 * Ruta GET para obtener todas las tarjetas para la interfaz de usuario.
 *
 * @name GET/getItems
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get("/getItems", async (req, res) => {
  // Lógica para obtener todas las tarjetas para la interfaz de usuario
});

/**
 * Ruta POST para obtener una tarjeta por su ID para la interfaz de usuario.
 *
 * @name POST/getItem/:_id
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post("/getItem/:_id", async (req, res) => {
  // Lógica para obtener una tarjeta por su ID para la interfaz de usuario
});

/**
 * Ruta PATCH para actualizar una tarjeta para la interfaz de usuario.
 *
 * @name PATCH/updateItem/:_id
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.patch("/updateItem/:_id", async (req, res) => {
  // Lógica para actualizar una tarjeta para la interfaz de usuario
});

/**
 * Ruta DELETE para eliminar una tarjeta para la interfaz de usuario.
 *
 * @name DELETE/deleteItem/:_id
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.delete("/deleteItem/:_id", async (req, res) => {
  // Lógica para eliminar una tarjeta para la interfaz de usuario
});

/**
 * Ruta GET para obtener todas las tarjetas para el backend.
 *
 * @name GET/
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get("/", cards.getItems);

/**
 * Ruta POST para crear una nueva tarjeta para el backend.
 *
 * @name POST/createItem
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post("/createItem", cards.createItem);

/**
 * Ruta GET para obtener una tarjeta por su token para el backend.
 *
 * @name GET/getItem/:token
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get("/getItem/:token", cards.getItem);

/**
 * Ruta PUT para actualizar una tarjeta para el backend.
 *
 * @name PUT/updateItem/:_id
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.put("/updateItem/:_id", cards.updateItem);

/**
 * Ruta POST para eliminar una tarjeta para el backend.
 *
 * @name POST/deleteItem/:_id
 * @function
 * @memberof module:routes/cardsRoutes
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post("/deleteItem/:_id", cards.deleteItem);

module.exports = router;
