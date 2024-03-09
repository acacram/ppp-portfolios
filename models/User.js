const mongoose = require('mongoose');

/**
 * Esquema de mongoose para representar un usuario.
 *
 * @typedef {Object} UserSchema
 * @property {string} username - Nombre de usuario.
 * @property {string} password - Contraseña del usuario.
 * @property {Date} createdAt - Fecha de creación del usuario (por defecto, la fecha actual).
 * @property {string} role - Rol del usuario (por defecto, 'user').
 * @property {Array<string>} cards - Lista de IDs de tarjetas asociadas al usuario.
 */

/**
 * @type {mongoose.Schema<UserSchema>}
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'user', // pq no va a ser admin
    required: true,
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
});

/**
 * Modelo de mongoose para la colección de usuarios.
 *
 * @type {mongoose.Model<UserSchema>}
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
