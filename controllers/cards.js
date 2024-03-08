const bcrypt = require("bcrypt");
const Cards = require("../models/Card");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
// Obtener lista de la base de datos
async function getItems(req, res) {
  const items = await Cards.find();
  res.json(items);
}

// Obtener un detalle
async function getItem(req, res) {
  try {
    const token = req.params.token;

    // Verifica el token y obtén el payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Obtén el ID del usuario desde el payload del token
    const userId = decodedToken.userId;
    if (!userId) {
      return res.status(404).json({ message: "userId not found" });
    }
    const items = await Cards.find({ user: userId });
    if (!items) {
      return res.status(404).json({ message: "Items not found" });
    }
    console.log("items:", items);
    // Responde con la información del usuario
    res.json({ items });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Error" });
  }
}
const createItem = async (req, res) => {
  const { title, text, visible, userId } = req.body;

  try {
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

// Actualizar un registro
async function updateItem(req, res) {
  const { _id } = req.params;

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

// Eliminar un registro
async function deleteItem(req, res) {
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

async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const data = await Cards.delete({ _id: id });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
