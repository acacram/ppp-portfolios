// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registration route
router.post('/signUp', async (req, res) => {
    const { username, password, fullName } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user with the required "role" field
        const newUser = new User({ username, password, fullName, role: 'user' });
        await newUser.save();

        return res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
