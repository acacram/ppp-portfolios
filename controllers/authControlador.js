const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importa el modelo User

/**
 * Maneja la lógica de inicio de sesión.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function login(req, res) {
  /**
   * Objeto que contiene las credenciales de inicio de sesión.
   *
   * @typedef {Object} Credentials
   * @property {string} username - Nombre de usuario.
   * @property {string} password - Contraseña del usuario.
   */

  /**
   * @type {Credentials}
   */
  const { username, password } = req.body;

  try {
    // Busca el usuario en la base de datos
    const user = await User.findOne({ username });

    // Verifica si el usuario existe y la contraseña es válida
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    /**
     * Token de autenticación generado para el usuario.
     *
     * @type {string}
     */
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Usar tu propia clave secreta

    // Responde con el token y el ID del usuario
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    res.status(500).json({ message: "Error durante el inicio de sesión" });
  }
}

/**
 * Maneja la lógica de cierre de sesión.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function logout(req, res) {
  try {
    // Respuesta exitosa
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Error during logout" });
  }
}

module.exports = { login, logout };
