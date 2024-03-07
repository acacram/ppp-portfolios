const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Importa multer
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT_BACK;

//ruta public static
// Middleware
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.json());

// Configura multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imagenes'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');

// Rutas
app.use('/auth', authRoutes); // Monta las rutas de autenticación en /auth
app.use('/cards', upload.single('image'), cardsRoutes); // Agrega multer al middleware de las rutas de las cartas
app.use('/users', usersRoutes);

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
