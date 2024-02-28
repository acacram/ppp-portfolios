const express = require("express")  //  Para manejar las rutas vamos a usar Express como proveedor del servicio web
const router = express.Router() //  Función para manejar rutas
const { getItems, getItem, createItem } = require("../controllers/templates") // Declaramos e importamos

//TODO http://localhost/templates GET, POST, DELETE, PUT

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);

module.exports = router