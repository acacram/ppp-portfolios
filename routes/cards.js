// Routes for cards
const express = require('express');
const router = express.Router();

const cards = require('../controllers/cards');

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
router.get('/', cards.getItems);

// Post routes for back
router.post('/createItem', cards.createItem)
router.post('/getItem/:_id', cards.getItem)

// Patch routes for back
router.patch('/updateItem/:_id', cards.updateItem)

// delete routes for back
router.post('/deleteItem/:_id', cards.deleteItem)

module.exports = router;