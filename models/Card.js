const mongoose = require('mongoose');

/**
 * Esquema de mongoose para representar una tarjeta.
 *
 * @typedef {Object} CardSchema
 * @property {string} image - Ruta de la imagen asociada a la tarjeta.
 * @property {string} title - Título de la tarjeta.
 * @property {string} text - Texto asociado a la tarjeta.
 * @property {boolean} visible - Indica si la tarjeta es visible o no.
 * @property {Date} date - Fecha de creación de la tarjeta (por defecto, la fecha actual).
 * @property {Array<string>} user - Lista de IDs de usuarios asociados a la tarjeta.
 */

/**
 * @type {mongoose.Schema<CardSchema>}
 */
const cardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

/**
 * Modelo de mongoose para la colección de tarjetas.
 *
 * @type {mongoose.Model<CardSchema>}
 */
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
