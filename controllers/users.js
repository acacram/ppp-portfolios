const bcrypt = require('bcrypt');
const Users = require('../models/User');

// Obtener lista de la base de datos
async function getItems(req, res) {
    const items = await Users.find();
    res.json(items);
}

// Obtener un detalle
async function getUserInfo(req, res) {
    try {
        const { _id } = req.params;
        console.log(_id);

        const item = await Users.findById(_id);
        if (item) {
            res.status(200).json(item); // Enviar la respuesta JSON sin select('username')
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Insertar un registro
async function createItem(req, res) {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const {
        username,
        password
    } = req.body;

    try {
        const User = new Users({ username, password });
        await User.save();
        res.status(200).json({ message: 'Registro exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
}

// Actualizar un registro
async function updateItem(req, res) {
    const { _id } = req.params;

    const { username, password } = req.body;

    try {
        const updateItem = await Users.findByIdAndUpdate(
            _id,
            { username, password },
            { new: true }
        );

        if (updateItem) {
            res.status(200).json("Registro actualizado");
        } else {
            rest.status(404).json("Registro no encontrado");
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el registro" });
    }

}

// Eliminar un registro
async function deleteItem(req, res) {
    const { _id } = req.params;
    try {
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

