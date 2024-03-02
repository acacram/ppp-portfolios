// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

    
        return res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
