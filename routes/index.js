const express = require("express"); // Declaramos la libreria/paquete de Express
const fs = require("fs") // importamos el paquete file system
const router = express.Router(); // Importamos la función para manejar rutas

const PATH_ROUTES = __dirname;//TODO

// __dirname es otra constante de Node que nos devuelve la ruta absoluta donde se encuentra ese archivo

const a = fs.readdirSync(PATH_ROUTES) // Método readdirSync (leerElDirectorioDeManeraAsincrona) de la funcióm fs 
// ↑ Devuleve un array
console.log({ a })

const removeExtension = (fileName) => { // para quitar el punto vamos a construirnos una funcion
    //TODO templates.js [templates, js]
    return fileName.split('.').shift() // Transformar una cadena de texto transformarla en un array basado en el .
}

fs.readdirSync(PATH_ROUTES).filter((file) => { // Queremos filtrar el array
    const name = removeExtension(file)//TODO index, templates --> Traducción de la expresión: Aquí puede que llegue index o puede que llegue track
    // ↑ Concatenar el nombre con una familia de rutas
    if (name !== 'index') { // No me interesa index
        console.log(`Cargando ruta ${name}`)
        router.use(`/${name}`, require(`./${file}`)) //TODO http://localhost:3000/api/templates --> La ruta va a ser el nombre del archivo
    }
})

// Exportamos route
module.exports = router
