const bcrypt = require('bcrypt');
const User = require('../models/User');

/**
 * Maneja la lógica de registro de usuarios.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function signup(req, res) {
  /**
   * Objeto que contiene la información de registro del usuario.
   *
   * @typedef {Object} SignupData
   * @property {string} username - Nombre de usuario.
   * @property {string} password - Contraseña del usuario.
   */

  /**
   * @type {SignupData}
   */
  const { username, password } = req.body;

  try {
    /**
     * Usuario existente con el mismo nombre de usuario.
     *
     * @type {Object|null}
     */
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Usuario existe' });
    }

    /**
     * Contraseña hash generada para el nuevo usuario.
     *
     * @type {string}
     */
    const hashedPassword = await bcrypt.hash(password, 10);

    /**
     * Nuevo usuario creado.
     *
     * @type {Object}
     */
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error' });
  }
}

module.exports = { signup };
