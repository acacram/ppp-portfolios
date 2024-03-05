const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa el modelo User

async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Busca el usuario en la base de datos
        const user = await User.findOne({ username });

        // Verifica si el usuario existe y la contraseña es válida
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Genera el token de autenticación
        const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' }); // Usar tu propia clave secreta
console.log("Logeado")
        // Responde con el token
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
}

module.exports = { login };
