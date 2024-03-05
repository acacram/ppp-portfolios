const bcrypt = require('bcrypt');
const Cards = require('../models/Card');

// Obtener lista de la base de datos
async function getItems(req, res) {
    const items = await Cards.find();
    res.json(items);
}

// Obtener un detalle
async function getItem(req, res) {

}

// Insertar un registro
async function createItem(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
}

// Actualizar un registro
async function updateItem(req, res) {

}

// Eliminar un registro
async function deleteItem(req, res) {

}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
