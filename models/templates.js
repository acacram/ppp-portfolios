// Plantilla modelo
const mongoose = require("mongoose") // Declaramos nuestro gestor

const TemplateScheme = new mongoose.Schema( // Estructura de nuestro objeto
    {
        property: { // Propiedad
            type: String
        },
    },
    {
        timestamps: true, // TODO createAt, updatedAt (Este campo nos va a registras las columnas de fecha de creación y fecha de actualización)
        versionKey: false // No se suele usar
    }
);

module.exports = mongoose.model("templates", TemplateScheme) // Vamos a exportar el modelo. ("nombreDeLaCollection",...) que viene a ser en de la tabla en MySQL