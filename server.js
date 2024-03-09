const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Import multer for handling file uploads
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

/**
 * Express application instance.
 * @type {object}
 */
const app = express();

/**
 * Port for the server to listen on.
 * @type {number|string}
 */
const PORT = process.env.PORT_BACK;

// Public static route

/**
 * Middleware for enabling Cross-Origin Resource Sharing (CORS).
 * @type {function}
 */
app.use(cors({ origin: 'http://localhost:3001' }));

/**
 * Middleware for parsing incoming JSON requests.
 * @type {function}
 */
app.use(bodyParser.json());

// Configure multer for handling file uploads

/**
 * Configuration for multer to handle file storage.
 * @type {object}
 */
const storage = multer.diskStorage({
  /**
   * Function to specify the destination folder for uploaded files.
   * @param {object} req - Express request object
   * @param {object} file - Uploaded file object
   * @param {function} cb - Callback function
   */
  destination: function (req, file, cb) {
    cb(null, 'public/imagenes'); // Folder where the images will be stored
  },

  /**
   * Function to specify the filename for uploaded files.
   * @param {object} req - Express request object
   * @param {object} file - Uploaded file object
   * @param {function} cb - Callback function
   */
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/**
 * Middleware for handling file uploads using multer with specified storage configuration.
 * @type {function}
 */
const upload = multer({ storage: storage });

// Connect to MongoDB

/**
 * Connect to MongoDB using Mongoose.
 * @type {Promise}
 */
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Import routes

/**
 * Authentication routes module.
 * @type {object}
 */
const authRoutes = require('./routes/authRoutes');

/**
 * Card routes module.
 * @type {object}
 */
const cardsRoutes = require('./routes/cards');

/**
 * User routes module.
 * @type {object}
 */
const usersRoutes = require('./routes/users');

// Routes

/**
 * Mount authentication routes at "/auth".
 */
app.use('/auth', authRoutes);

/**
 * Add multer to the middleware for card routes and mount at "/cards".
 * @param {string} '/image' - Name of the file input field in the request.
 */
app.use('/cards', upload.single('image'), cardsRoutes);

/**
 * Mount user routes at "/users".
 */
app.use('/users', usersRoutes);

// Start the server

/**
 * Start the server and listen on the specified port.
 * @type {function}
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
