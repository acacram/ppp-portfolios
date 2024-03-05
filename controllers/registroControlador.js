const bcrypt = require('bcrypt');
const User = require('../models/User');

async function signup(req, res) {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Usuario existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        console.log("registrao") ;
        res.json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error' });
    }
}

module.exports = { signup };
