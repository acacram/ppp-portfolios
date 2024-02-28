const { templatesModel } = require('../models');
// Quiero llamar al modelo templatesModel que lo consigues en --/models

/**
* Obtener lista de la base de datos!
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => { // En toda función que tenga un await tiene que tener especificado un async
    const data = await templatesModel.find({}) // Esperar una promesa
    res.send({ data });
};

/**
* Obtener un detalle
* @param {*} req
* @param {*} res
*/
const getItem = (req, res) => {
    const itemId = req.params.id;
    res.send(`Getting details for item with ID: ${itemId}`);
};

/**
* Insertar un registro
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {
    /*	const body = req.body --> Cuando la constante
     se llama como la propiedad que queremos hacer,
    destructuramos.	*/
    const { body } = req
    console.log(body)
    const data = await templatesModel.create(body)
    res.send({ data }) // Los controladores deben siempre retornar algo
};

/**
* Actualizar un registro
* @param {*} req
* @param {*} res
*/
const updateItem = (req, res) => {
    const itemId = req.params.id;
    res.send(`Updating item with ID: ${itemId}`);
};

/**
* Eliminar un registro
* @param {*} req
* @param {*} res
*/
const deleteItem = (req, res) => {
    const itemId = req.params.id;
    res.send(`Deleting item with ID: ${itemId}`);
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
