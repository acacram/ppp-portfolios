const mongoose = require("mongoose");	// Declaramos el paquete que hemos instalado

const dbConnect = async () => {	// Declaramos la función de conexión a la DB

    const DB_URI = process.env.DB_URI;

    try {
        await mongoose.connect(
            DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('**** CONEXION CORRECTA ****')
    } catch (error) {
        console.error('**** ERROR DE CONEXION ****'); //  --> , error
    }
};

module.exports = dbConnect	/*	Exportamos la función, para que se pueda usar en el resto de archivos */