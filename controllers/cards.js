const bcrypt = require('bcrypt');
const Cards = require('../models/Card');

// Obtener lista de la base de datos
async function getItems(req, res) {
    const items = await Cards.find();
    res.json(items);
}

// Obtener un detalle
async function getItem(req, res) {
    try {
        const item = await Cards.findById(req.params._id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Error' });
    }
}

// Obtener varios detalles de un usuario
async function getItemsById(req, res) {
    try {
        // Obtiene el ID del usuario desde los parámetros de la ruta
        const userId = req.params._id;
        console.log('User ID:', userId);

        // Busca en la base de datos los elementos asociados al usuario
        const items = await Cards.find({ user: userId });

        // Responde con los elementos obtenidos en formato JSON
        res.json(items);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la operación
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Error' });
    }
}

// Insertar un registro
async function createItem(req, res) {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const {
        title,
        text,
        date,
        image } = req.body;

    try {
        const card = new Cards({ title, text, date, image });
        await card.save();
        res.status(200).json({ message: 'Registro exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
}

// Actualizar un registro
async function updateItem(req, res) {
    const { _id } = req.params;

    const { title, text, date, image, user } = req.body;

    try {
        const updatedItem = await Cards.findByIdAndUpdate(
            _id,
            { title, text, date, image, $addToSet: { user: { $each: user } } },
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
            res.status(200).json('Se ha eliminado el item correctamente');
        } else {
            res.status(404).json({ error: 'Item no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el item' });
    }
}

// async function deleteItem(req, res) {
//     try {
//         const { id } = req.params;
//         const data = await Cards.delete({ _id: id });
//         res.send({ data });
//     } catch (e) {
//         handleHttpError(res, "ERROR_DELETE_ITEM");
//     }
// };

module.exports = { getItems, getItem, getItemsById, createItem, updateItem, deleteItem };

