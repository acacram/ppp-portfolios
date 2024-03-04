// Aqui son las rutas del backend
// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación
// Importar las variables de entorno
require('dotenv').config();

const app = express();

// Configura el middleware cors
app.use(cors({
  origin: 'http://localhost:3001', // Permitir solicitudes solo desde el frontend en localhost:3001
}));

// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Ruta para obtener todas las cartas
app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find(); // Obtiene todas las cartas desde la base de datos
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar el servidor
app.listen(process.env.PORT_BACK, () => console.log(`Server running on port ${process.env. PORT_BACK}`));
