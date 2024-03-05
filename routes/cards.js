// Routes for cards
const express = require('express');
const router = express.Router();

const cards = require('../controllers/cards');

// Get routes for front
router.get('/cards', async (req, res) => {
});

// Get routes for back
router.get('/', cards.getItems);

module.exports = router;