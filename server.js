const express = require('express');
const mongoose = require('mongoose');
const Card = require('./models/Card');
const cors = require('cors'); // Importa el middleware cors

const app = express();
const PORT = 5000;

// Configura el middleware cors
app.use(cors({
  origin: 'http://localhost:3001', // Permite solicitudes solo desde el frontend en localhost:3000
}));

mongoose.connect('mongodb+srv://acaceresr:TYzT8UEtKkleLGgE@cluster0.nvlfzx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find(); // Obtiene todas las cartas desde la base de datos
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
