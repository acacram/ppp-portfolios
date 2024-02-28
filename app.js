require("dotenv").config()	/* dogenv --> Importar un paquete que hace que funcionen bien las variables de entorno. */
/* ↑ ↑ ↑ Le estamos diciendo a la app: ↑ ↑ ↑
- ¡Eh!, aplicación, utiliza las variables de entorno. */
const express = require("express") // Declaramos la libreria/paquete de Express. Ayuda a iniciar o levantar un servicio web.
const cors = require("cors") // Incorporación de la librería de cors.
const app = express()
const port = process.env.PORT || 3000
const dbConnect = require('./config/mongo') // Importamos y declaramos la función

app.use(express.json())
app.use(cors()) // Has uso de cors. Evitar error de origen cruzado entre navegadores.

app.listen(port, () => { // Primer argumento el puerto y luego la función
    console.log(`Your app is ready for: http://localhost:${port}`)
})

/**
 * Aguí invocamos a las rutas! 😎
 */

//TODO localhost/api/________ // Colocar un prefijo
app.use("/api", require("./routes/")) // Quiero que api lo concatene con /templates

dbConnect()