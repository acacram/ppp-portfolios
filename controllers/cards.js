const bcrypt = require("bcrypt");
const Cards = require("../models/Card");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

/**
 * Obtiene la lista de items desde la base de datos.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function getItems(req, res) {
  const items = await Cards.find({ visible: true });
  res.json(items);
}

/**
 * Obtiene los detalles de un item utilizando un token de autenticación.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function getItem(req, res) {
  try {
    /**
     * Token de autenticación enviado en los parámetros de la URL.
     *
     * @type {string}
     */
    const token = req.params.token;

    // Verifica el token y obtén el payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Obtén el ID del usuario desde el payload del token
    const userId = decodedToken.userId;
    if (!userId) {
      return res.status(404).json({ message: "userId not found" });
    }

    /**
     * Lista de items pertenecientes al usuario.
     *
     * @type {Array}
     */
    const items = await Cards.find({ user: userId });

    if (!items) {
      return res.status(404).json({ message: "Items not found" });
    }

    // Responde con la información del usuario
    res.json({ items });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Error" });
  }
}

/**
 * Crea un nuevo item en la base de datos.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
const createItem = async (req, res) => {
  /**
   * Detalles del nuevo item a crear.
   *
   * @typedef {Object} ItemDetails
   * @property {string} title - Título del item.
   * @property {string} text - Texto del item.
   * @property {boolean} visible - Visibilidad del item.
   * @property {string} userId - ID del usuario asociado al item.
   */

  /**
   * @type {ItemDetails}
   */
  const { title, text, visible, userId } = req.body;

  try {
    /**
     * URL de la imagen asociada al item.
     *
     * @type {string|null}
     */
    let image = null;

    if (req.file) {
      // Obtener el nombre del archivo de imagen
      const imageName = req.file.originalname;
      // Construir la URL sin la carpeta public
      image = `/imagenes/${imageName}`; // Ruta relativa a la carpeta public
    }

    const card = new Cards({ title, text, visible, image, user: userId });
    await card.save();

    res.status(200).json({ message: "Registro exitoso" });
  } catch (error) {
    console.error("Error al crear la carta:", error);
    res.status(500).json({ message: "Error" });
  }
};

/**
 * Actualiza un registro en la base de datos.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function updateItem(req, res) {
  /**
   * Parámetros para actualizar el item.
   *
   * @typedef {Object} UpdateItemParams
   * @property {string} _id - ID del item a actualizar.
   */

  /**
   * Detalles actualizados del item.
   *
   * @typedef {Object} UpdatedItemDetails
   * @property {string} title - Nuevo título del item.
   * @property {string} text - Nuevo texto del item.
   * @property {string} date - Nueva fecha del item.
   * @property {string} image - Nueva URL de la imagen del item.
   */

  /**
   * @type {UpdateItemParams}
   */
  const { _id } = req.params;

  /**
   * @type {UpdatedItemDetails}
   */
  const { title, text, date, image } = req.body;

  try {
    const updatedItem = await Cards.findByIdAndUpdate(
      _id,
      { title, text, date, image },
      { new: true }
    );

    if (updatedItem) {
      res.status(200).json("Registro actualizado");
    } else {
      res.status(404).json("Registro no encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el registro" });
  }
}

/**
 * Elimina un registro de la base de datos.
 *
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa sin valor de retorno explícito.
 */
async function deleteItem(req, res) {
  /**
   * Parámetros para eliminar el item.
   *
   * @typedef {Object} DeleteItemParams
   * @property {string} _id - ID del item a eliminar.
   */

  /**
   * @type {DeleteItemParams}
   */
  const { _id } = req.params;

  try {
    const deletedItem = await Cards.findByIdAndDelete(_id);

    if (deletedItem) {
      res.status(200).json("Se ha eliminado el item correctamente");
    } else {
      res.status(404).json({ error: "Item no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el item" });
  }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
