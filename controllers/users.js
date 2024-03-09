const bcrypt = require('bcrypt');
const Users = require('../models/User');

/**
 * Obtiene la lista de usuarios de la base de datos.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function getItems(req, res) {
  try {
    /**
     * Lista de usuarios obtenida de la base de datos.
     *
     * @type {Array<Object>}
     */
    const items = await Users.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

/**
 * Obtiene la información de un usuario por su ID.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function getUserInfo(req, res) {
  try {
    /**
     * ID del usuario para obtener detalles.
     *
     * @type {string}
     */
    const { _id } = req.params;

    /**
     * Información del usuario obtenida por su ID.
     *
     * @type {Object|null}
     */
    const item = await Users.findById(_id);

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function createItem(req, res) {
  /**
   * Información para crear un nuevo usuario.
   *
   * @typedef {Object} CreateUser
   * @property {string} username - Nombre de usuario.
   * @property {string} password - Contraseña del usuario.
   */

  /**
   * @type {CreateUser}
   */
  const { username, password } = req.body;

  try {
    /**
     * Nuevo usuario creado en la base de datos.
     *
     * @type {Object}
     */
    const User = new Users({ username, password });
    await User.save();
    res.status(200).json({ message: 'Registro exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
}

/**
 * Actualiza la información de un usuario existente.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function updateItem(req, res) {
  /**
   * ID del usuario a actualizar.
   *
   * @type {string}
   */
  const { _id } = req.params;

  /**
   * Nueva información del usuario.
   *
   * @typedef {Object} UpdateUser
   * @property {string} username - Nuevo nombre de usuario.
   * @property {string|null} password - Nueva contraseña del usuario (puede ser nula).
   */

  /**
   * @type {UpdateUser}
   */
  const { username, password } = req.body;

  try {
    /**
     * Contraseña hasheada para la actualización.
     *
     * @type {string|undefined}
     */
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    /**
     * Usuario actualizado en la base de datos.
     *
     * @type {Object|null}
     */
    const updatedItem = await Users.findByIdAndUpdate(
      _id,
      { username, password: hashedPassword },
      { new: true }
    );

    if (updatedItem) {
      res.status(200).json('Registro actualizado');
    } else {
      res.status(404).json('Registro no encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
}

/**
 * Elimina un usuario de la base de datos.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function deleteItem(req, res) {
  /**
   * ID del usuario a eliminar.
   *
   * @type {string}
   */
  const { _id } = req.params;

  try {
    /**
     * Usuario eliminado de la base de datos.
     *
     * @type {Object|null}
     */
    const deletedItem = await Users.findByIdAndDelete(_id);

    if (deletedItem) {
      res.status(200).json('Se ha eliminado el item correctamente');
    } else {
      res.status(404).json({ error: 'Item no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el item' });
  }
}

module.exports = { getItems, getUserInfo, createItem, updateItem, deleteItem };
