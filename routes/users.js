// Routes for users
const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

// Get routes for front
router.get('/getItems', async (req, res) => {
});

// Get routes per Id for front
router.post('/getItem/:_id', async (req, res) => {
});

// Update item for Front
router.patch('/updateItem/:_id', async (req, res) => {
});

// Delete item for Front
router.delete('/deleteItem/:_id', async (req, res) => {
});


// Get routes for back
router.get('/', users.getItems);

// Post routes for back
router.post('/createItem', users.createItem)
router.get('/getUserInfo/:_id', users.getUserInfo)

// Patch routes for back
router.put('/updateItem/:_id', users.updateItem)

// delete routes for back
router.post('/deleteItem/:_id', users.deleteItem)

module.exports = router;