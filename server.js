// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT_BACK;

// Middleware
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const cardsRoutes = require('./routes/cards');

// Rutas
app.use('/auth', authRoutes); // Monta las rutas de autenticación en /auth
app.use('/cards', cardsRoutes);

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
